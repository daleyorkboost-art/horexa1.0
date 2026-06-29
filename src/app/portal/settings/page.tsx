import { Bell, KeyRound, Mail, Smartphone } from "lucide-react";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";

const settingsSections = [
  { label: "Password protected account", icon: KeyRound },
  { label: "OTP login", icon: Smartphone },
  { label: "Email notifications", icon: Mail },
  { label: "Inspection reminders", icon: Bell },
];

export default function PortalSettingsPage() {
  return (
    <PortalShell activeHref="/portal/settings" title="Profile Settings" description="Update account details, password, notification channels, and portal preferences.">
      <div className="grid gap-6 xl:grid-cols-2">
        <PortalPanel title="Company Profile" description="Client profile fields will render here after authenticated account data is connected." />
        <PortalPanel title="Security & Notifications" description="Security and notification preferences will be enabled after portal account policies are finalized.">
          <div className="grid gap-4">
            {settingsSections.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-lg border border-border bg-background/45 p-4 text-sm font-bold text-muted-foreground">
                  <Icon className="text-primary" aria-hidden />
                  {item.label}
                </div>
              );
            })}
          </div>
        </PortalPanel>
      </div>
    </PortalShell>
  );
}
