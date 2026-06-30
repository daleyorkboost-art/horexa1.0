/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldValue,
  Timestamp,
  type CollectionReference,
  type DocumentData,
} from "firebase-admin/firestore";
import { adminDb } from "@/firebase/admin";
import { collections } from "@/firebase/collections";

type WhereInput = Record<string, any> | undefined;
type OrderByInput = Record<string, "asc" | "desc"> | Record<string, "asc" | "desc">[] | undefined;

type FindManyArgs = {
  where?: WhereInput;
  take?: number;
  skip?: number;
  orderBy?: OrderByInput;
  include?: Record<string, unknown>;
  select?: Record<string, unknown>;
};

type FindUniqueArgs = {
  where: { id?: string; slug?: string; email?: string; key?: string; [key: string]: unknown };
  select?: Record<string, unknown>;
  include?: Record<string, unknown>;
};

type WriteArgs = {
  data: Record<string, unknown>;
  select?: Record<string, unknown>;
  include?: Record<string, unknown>;
};

type UpdateArgs = {
  where: { id: string };
  data: Record<string, unknown>;
  select?: Record<string, unknown>;
  include?: Record<string, unknown>;
};

function serialize(value: unknown): unknown {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (Array.isArray(value)) {
    return value.map(serialize);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, serialize(entry)]));
  }

  return value;
}

function normalizeData(data: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, value instanceof Date ? Timestamp.fromDate(value) : value]),
  );
}

type FirestoreRecord = { id: string } & Record<string, any>;

function docFromSnapshot(snapshot: FirebaseFirestore.DocumentSnapshot<DocumentData>): FirestoreRecord | null {
  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(serialize(snapshot.data() ?? {}) as Record<string, unknown>),
  };
}

function requireDoc(snapshot: FirebaseFirestore.DocumentSnapshot<DocumentData>): FirestoreRecord {
  const item = docFromSnapshot(snapshot);
  if (!item) {
    throw new Error("Firestore document was not found after write");
  }

  return item;
}

function getPathValue(item: Record<string, any>, path: string) {
  return path.split(".").reduce<any>((value, segment) => (value == null ? undefined : value[segment]), item);
}

function compareScalar(actual: unknown, expected: unknown) {
  if (expected && typeof expected === "object" && !Array.isArray(expected)) {
    const input = expected as Record<string, any>;
    if ("in" in input) return Array.isArray(input.in) && input.in.includes(actual);
    if ("equals" in input) return actual === input.equals;
    if ("gt" in input) return Number(new Date(String(actual))) > Number(new Date(String(input.gt)));
    if ("lt" in input) return Number(new Date(String(actual))) < Number(new Date(String(input.lt)));
    if ("gte" in input) return Number(new Date(String(actual))) >= Number(new Date(String(input.gte)));
    if ("lte" in input) return Number(new Date(String(actual))) <= Number(new Date(String(input.lte)));
    if ("contains" in input) {
      const lhs = String(actual ?? "");
      const rhs = String(input.contains ?? "");
      return input.mode === "insensitive" ? lhs.toLowerCase().includes(rhs.toLowerCase()) : lhs.includes(rhs);
    }
    if ("has" in input) return Array.isArray(actual) && actual.includes(input.has);
    if ("isEmpty" in input) return Array.isArray(actual) && actual.length === 0;
  }

  return actual === expected;
}

function matchesWhere(item: Record<string, any>, where?: WhereInput): boolean {
  if (!where || Object.keys(where).length === 0) {
    return true;
  }

  return Object.entries(where).every(([key, expected]) => {
    if (key === "AND") {
      return Array.isArray(expected) && expected.every((clause) => matchesWhere(item, clause));
    }

    if (key === "OR") {
      return Array.isArray(expected) && expected.some((clause) => matchesWhere(item, clause));
    }

    if (key === "NOT") {
      return !matchesWhere(item, expected as WhereInput);
    }

    const actual = getPathValue(item, key);

    if (expected && typeof expected === "object" && "some" in (expected as Record<string, unknown>)) {
      const nested = (expected as { some: WhereInput }).some;
      return Array.isArray(actual) && actual.some((entry) => matchesWhere(entry, nested));
    }

    return compareScalar(actual, expected);
  });
}

function applyOrdering(items: Record<string, any>[], orderBy?: OrderByInput) {
  const orderEntries = (Array.isArray(orderBy) ? orderBy : orderBy ? [orderBy] : [{ createdAt: "desc" }]).flatMap((entry) =>
    Object.entries(entry),
  );

  return [...items].sort((left, right) => {
    for (const [field, direction] of orderEntries) {
      const leftValue = getPathValue(left, field);
      const rightValue = getPathValue(right, field);

      if (leftValue === rightValue) continue;

      const result = leftValue > rightValue ? 1 : -1;
      return direction === "desc" ? -result : result;
    }

    return 0;
  });
}

class FirestoreModel {
  constructor(private readonly collectionName: string) {}

  private collection(): CollectionReference<DocumentData> {
    return adminDb().collection(this.collectionName);
  }

  async findMany(args: FindManyArgs = {}) {
    const snapshot = await this.collection().get();
    const items = snapshot.docs
      .map(docFromSnapshot)
      .filter(Boolean)
      .filter((item) => matchesWhere(item as Record<string, any>, args.where)) as Record<string, any>[];

    const ordered = applyOrdering(items, args.orderBy);
    return ordered.slice(args.skip ?? 0, (args.skip ?? 0) + (args.take ?? ordered.length));
  }

  async count(args: { where?: WhereInput } = {}) {
    const items = await this.findMany({ where: args.where });
    return items.length;
  }

  async findUnique(args: FindUniqueArgs) {
    const id = args.where.id;
    if (id) {
      return docFromSnapshot(await this.collection().doc(id).get());
    }

    return this.findFirst({ where: args.where });
  }

  async findFirst(args: FindManyArgs = {}) {
    const [item] = await this.findMany({ ...args, take: 1 });
    return item ?? null;
  }

  async create(args: WriteArgs) {
    const data = {
      ...normalizeData(args.data),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const ref = await this.collection().add(data);
    return requireDoc(await ref.get());
  }

  async update(args: UpdateArgs) {
    const data = {
      ...normalizeData(args.data),
      updatedAt: FieldValue.serverTimestamp(),
    };
    await this.collection().doc(args.where.id).set(data, { merge: true });
    return requireDoc(await this.collection().doc(args.where.id).get());
  }

  async updateMany(args: { where?: WhereInput; data: Record<string, unknown> }) {
    const items = await this.findMany({ where: args.where });
    await Promise.all(items.map((item) => this.update({ where: { id: String(item.id) }, data: args.data })));
    return { count: items.length };
  }

  async delete(args: { where: { id: string } }) {
    const existing = await this.findUnique(args);
    await this.collection().doc(args.where.id).delete();
    return existing;
  }

  async upsert(args: {
    where: FindUniqueArgs["where"];
    update: Record<string, unknown>;
    create: Record<string, unknown>;
    include?: Record<string, unknown>;
    select?: Record<string, unknown>;
  }) {
    const existing = await this.findUnique({ where: args.where });
    if (existing && "id" in existing) {
      return this.update({ where: { id: String(existing.id) }, data: args.update });
    }

    return this.create({ data: args.create });
  }
}

export const firestoreModels = {
  aMCPlan: new FirestoreModel(collections.amcPlans),
  application: new FirestoreModel(collections.applications),
  auditLog: new FirestoreModel(collections.auditLogs),
  blogPost: new FirestoreModel(collections.blogPosts),
  career: new FirestoreModel(collections.careers),
  category: new FirestoreModel(collections.categories),
  client: new FirestoreModel(collections.clients),
  clientMember: new FirestoreModel(collections.clientMembers),
  complianceRecord: new FirestoreModel(collections.complianceRecords),
  document: new FirestoreModel(collections.documents),
  emailLog: new FirestoreModel(collections.emailLogs),
  fAQ: new FirestoreModel(collections.faqs),
  inquiry: new FirestoreModel(collections.inquiries),
  inspectionReport: new FirestoreModel(collections.inspectionReports),
  invoice: new FirestoreModel(collections.invoices),
  newsletterSubscription: new FirestoreModel(collections.newsletterSubscriptions),
  notification: new FirestoreModel(collections.notifications),
  oTPToken: new FirestoreModel(collections.otpTokens),
  passwordResetToken: new FirestoreModel(collections.passwordResetTokens),
  project: new FirestoreModel(collections.projects),
  rateLimitEvent: new FirestoreModel(collections.rateLimitEvents),
  seoMetadata: new FirestoreModel(collections.seoMetadata),
  service: new FirestoreModel(collections.services),
  ticket: new FirestoreModel(collections.supportTickets),
  testimonial: new FirestoreModel(collections.testimonials),
  uploadAsset: new FirestoreModel(collections.uploadAssets),
  user: new FirestoreModel(collections.users),
  websiteSetting: new FirestoreModel(collections.settings),
  $transaction: async <T>(operations: Promise<T>[]) => Promise.all(operations),
};

export type FirestoreModels = typeof firestoreModels;
