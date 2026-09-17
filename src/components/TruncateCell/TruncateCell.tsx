import { Cell, Tooltip } from "@promethei-project/promethei-app-components";
import "./TruncateCell.css";

type Props = {
  value: string;
};

export function TruncateCell({ value }: Props) {
  if (value.length <= 10) {
    return <span id={value}>{value}</span>;
  }

  return (
    <Cell className="truncate-cell">
      <div>
        <Tooltip message={value}>
          <small>{value}</small>
        </Tooltip>
      </div>
    </Cell>
  );
}
