import "./AvailabilityActionsCell.css";
import { PrometheiAvailability } from "@promethei-project/promethei-sdk-js/async";
import { ButtonIcon, Cell } from "@promethei-project/promethei-app-components";
import EditIcon from "../../assets/icons/edit.svg?react";

type Props = {
  availability: PrometheiAvailability;
};

export function AvailabilityActionsCell({ availability }: Props) {
  const onEditClick = async () => {
    document.dispatchEvent(
      new CustomEvent("prometheiavailabilityedit", { detail: availability })
    );
  };

  return (
    <Cell>
      <div className="availability-actions">
        <ButtonIcon
          variant="small"
          onClick={onEditClick}
          Icon={EditIcon}></ButtonIcon>
      </div>
    </Cell>
  );
}
