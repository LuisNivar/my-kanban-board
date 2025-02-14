import { useContext, useState } from "react";
import { SidebarContext, SidebarDispatchContext } from "../../../Context";
import { BackgrounIcon } from "../../Icons";
import Switch from "../../UI/Switch";
import { Field } from "../Field";
import { Sections } from "../Sections";
import SelectBoards from "../SelectBoards";
import { BACKGROUNDS_COLLECTION } from "../utils";
import BackgroundsCategory from "./BackgroundCategory";
import BackgroundToggle from "./BackgroundToggle";
import useBackgroundSelector from "./useBackgorundSelector";

export default function BackgrounbdSection() {
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const dispatch = useContext(SidebarDispatchContext);
  const sidebar = useContext(SidebarContext);

  const {
    setShowBackgrounds,
    showBackgrounds,
    handleSelectionChange,
    backgrounds,
  } = useBackgroundSelector({
    backgrounds: BACKGROUNDS_COLLECTION,
    selectedBoard,
    dispatch,
    sidebar,
  });

  return (
    <Sections title="Customization" icon={<BackgrounIcon />}>
      <div className="flex gap-5 flex-col text-neutral-400">
        <Field htmlFor="select" label="Apply to">
          <SelectBoards onValueChange={setSelectedBoard} />
        </Field>
        <Field htmlFor="show" label="Show backgrounds aviables">
          <Switch
            color="teal"
            id="show"
            checked={showBackgrounds}
            onCheckedChange={setShowBackgrounds}
            disabled={!selectedBoard}
          />
        </Field>

        <BackgroundsCategory title="Gradients">
          {backgrounds
            .filter((b) => b.type === "gradient")
            .map((b) => (
              <BackgroundToggle
                key={b.key}
                onChange={handleSelectionChange}
                background={b.value}
                id={b.key}
                active={b.toggled}
                disable={b.disable}
              />
            ))}
        </BackgroundsCategory>

        <BackgroundsCategory title="Images">
          {backgrounds
            .filter((b) => b.type === "image")
            .map((b) => (
              <BackgroundToggle
                key={b.key}
                onChange={handleSelectionChange}
                background={b.value}
                id={b.key}
                active={b.toggled}
                disable={b.disable}
              />
            ))}
        </BackgroundsCategory>
      </div>
    </Sections>
  );
}
