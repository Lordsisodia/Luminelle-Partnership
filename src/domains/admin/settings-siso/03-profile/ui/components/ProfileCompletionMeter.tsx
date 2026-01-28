import { Trophy, Circle } from "lucide-react";
import { SettingsGroupCallout } from "@/domains/admin/settings-siso/shared/components/SettingsGroupCallout";

type ProfileCompletionMeterProps = {
  completion: number;
  missingFields: string[];
};

export function ProfileCompletionMeter({ completion, missingFields }: ProfileCompletionMeterProps) {
  const getColor = () => {
    if (completion >= 100) return 'text-green-400';
    if (completion >= 80) return 'text-blue-400';
    if (completion >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBarColor = () => {
    if (completion >= 100) return 'bg-green-400';
    if (completion >= 80) return 'bg-blue-400';
    if (completion >= 50) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <SettingsGroupCallout
      icon={<Trophy className="h-4 w-4" />}
      title="Profile Completion"
      subtitle={completion === 100 ? "Your profile is complete!" : `${missingFields.length} field${missingFields.length !== 1 ? 's' : ''} remaining`}
      showChevron={false}
    >
      <div className="space-y-3">
        {/* Progress bar */}
        <div className="relative h-2 w-full rounded-full bg-siso-bg-hover overflow-hidden">
          <div
            className={`h-2 rounded-full ${getBarColor()} transition-all duration-500 ease-out`}
            style={{ width: `${completion}%` }}
            role="progressbar"
            aria-valuenow={completion}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Profile completion: ${completion}%`}
          />
        </div>

        {/* Percentage */}
        <div className="flex items-center justify-between">
          <span className={`text-2xl font-bold ${getColor()}`} aria-live="polite">
            {completion}%
          </span>
          {completion === 100 && (
            <span className="text-sm text-siso-text-muted flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-400" aria-hidden="true" />
              Complete!
            </span>
          )}
        </div>

        {/* Missing fields list */}
        {completion < 100 && missingFields.length > 0 && (
          <div className="rounded-xl border border-siso-border/70 bg-siso-bg-secondary p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-siso-text-muted mb-2">
              Complete Your Profile
            </p>
            <ul className="space-y-1" role="list" aria-label="Missing profile fields">
              {missingFields.slice(0, 10).map((field) => (
                <li key={field} className="text-xs text-siso-text-muted flex items-center gap-2">
                  <Circle className="h-1 w-1 fill-siso-orange text-siso-orange" aria-hidden="true" />
                  {field}
                </li>
              ))}
              {missingFields.length > 10 && (
                <li className="text-xs text-siso-text-muted italic">
                  ...and {missingFields.length - 10} more
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Completion message for high completion */}
        {completion >= 80 && completion < 100 && (
          <p className="text-xs text-siso-text-muted text-center">
            You&apos;re almost there! Just a few more fields to complete.
          </p>
        )}
      </div>
    </SettingsGroupCallout>
  );
}
