import { useState } from "react";
import { AdjustmentIcon } from "../Icons";
import Select from "../UI/Select";
import Switch from "../UI/Switch";
import { Field } from "./Field";
import { Sections } from "./Sections";

export default function GeneralSection() {
  const [selectedLang, setSelectedLang] = useState<string>("en");
  const [showTrashCan, setShowTranshCan] = useState(true);

  return (
    <Sections title="General Settings" icon={<AdjustmentIcon />}>
      <div className="flex gap-5 flex-col w-[300px] text-neutral-400">
        <Field htmlFor="select" label="Apply to">
          <Select ariaLabel="Languages" placeholder={selectedLang}>
            <Select.Content>
              <Select.Item value="en">English</Select.Item>
              <Select.Item value="es">Spanish</Select.Item>
            </Select.Content>
          </Select>
        </Field>

        <Field htmlFor="trash-can" label="Show TrashCan">
          <Switch
            checked={showTrashCan}
            onCheckedChange={setShowTranshCan}
            color="teal"
            id="trash-can"
          />
        </Field>
      </div>
    </Sections>
  );
}
