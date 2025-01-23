import { useState } from "react";
import { AdjustmentIcon } from "../Icons";
import Switch from "../UI/Switch";
import { Field } from "./Field";
import { Sections } from "./Sections";
import SelectBoards from "./SelectBoards";

export default function GeneralSection() {
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

  return (
    <Sections title="General Settings" icon={<AdjustmentIcon />}>
      <div className="flex gap-5 flex-col w-[300px] text-neutral-400">
        <Field htmlFor="select" label="Apply to">
          <SelectBoards onValueChange={setSelectedBoard} />
        </Field>

        <Field htmlFor="testing" label="Show Testing column">
          <Switch color="teal" id="testing" />
        </Field>
        <Field htmlFor="trash-can" label="Show TrashCan">
          <Switch color="teal" id="trash-can" />
        </Field>
      </div>
    </Sections>
  );
}
