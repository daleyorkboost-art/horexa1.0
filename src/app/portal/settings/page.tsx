import { Bell, KeyRound, Mail, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { portalClient } from "@/lib/portal-data";

export default function PortalSettingsPage() {
  return (
    <PortalShell activeHref="/portal/settings" title="Profile Settings" description="Update account details, password, notification channels, and portal preferences.">
      <div className="grid gap-6 xl:grid-cols-2">
        <PortalPanel title="Company Profile" description="Client account details are editable once backend auth is connected." action="Save Changes">
          <form className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue={portalClient.name} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={portalClient.location} />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label htmlFor="email">Primary Email</Label>
              <Input id="email" defaultValue={portalClient.contact} />
            </div>
          </form>
        </PortalPanel>
        <PortalPanel title="Security" description="Password and OTP settings are UI-only until authentication is integrated." action="Update Password">
          <div className="grid gap-4">
            {[
              { label: "Password protected account", icon: KeyRound },
              { label: "OTP login enabled", icon: Smartphone },
              { label: "Email notifications active", icon: Mail },
              { label: "Inspection reminders enabled", icon: Bell },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-border bg-background/45 p-4">
                  <span className="flex items-center gap-3 text-sm font-bold"><Icon className="text-primary" aria-hidden /> {item.label}</span>
                  <input type="checkbox" defaultChecked className="size-5 accent-primary" />
                </div>
              );
            })}
          </div>
        </PortalPanel>
      </div>
      <div className="mt-8">
        <PortalPanel title="Notification Preferences" description="Choose where inspection reports, tickets, invoices, and AMC reminders should be sent.">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Email Reports</Button>
            <Button variant="outline">WhatsApp Alerts</Button>
            <Button variant="outline">Invoice Copies</Button>
            <Button variant="outline">Monthly Summary</Button>
          </div>
        </PortalPanel>
      </div>
    </PortalShell>
  );
}
