import { TabSortState } from "@promethei-project/promethei-app-components";
import { PrometheiPurchase, PrometheiStorageRequest } from "@promethei-project/promethei-sdk-js";

export const PurchaseUtils = {
  sortById: (state: TabSortState) => (a: PrometheiPurchase, b: PrometheiPurchase) => {
    return state === "desc"
      ? b.requestId
          .toLocaleLowerCase()
          .localeCompare(a.requestId.toLocaleLowerCase())
      : a.requestId
          .toLocaleLowerCase()
          .localeCompare(b.requestId.toLocaleLowerCase());
  },
  sortByState: (state: TabSortState) => (a: PrometheiPurchase, b: PrometheiPurchase) =>
    state === "desc"
      ? b.state.toLocaleLowerCase().localeCompare(a.state.toLocaleLowerCase())
      : a.state.toLocaleLowerCase().localeCompare(b.state.toLocaleLowerCase()),
  sortByDuration:
    (state: TabSortState) => (a: PrometheiPurchase, b: PrometheiPurchase) =>
      state === "desc"
        ? Number(b.request.ask.duration) - Number(a.request.ask.duration)
        : Number(a.request.ask.duration) - Number(b.request.ask.duration),
  sortByReward:
    (state: TabSortState) => (a: PrometheiPurchase, b: PrometheiPurchase) => {
      const aPrice = parseInt(a.request.ask.pricePerBytePerSecond, 10);
      const bPrice = parseInt(b.request.ask.pricePerBytePerSecond, 10);
      return state === "desc" ? bPrice - aPrice : aPrice - bPrice;
    },
  sortByUploadedAt:
    (state: TabSortState, table: Record<string, number>) =>
    (a: PrometheiPurchase, b: PrometheiPurchase) => {
      return state === "desc"
        ? (table[b.requestId] || 0) - (table[a.requestId] || 0)
        : (table[a.requestId] || 0) - (table[b.requestId] || 0);
    },
  calculatePrice(request: PrometheiStorageRequest) {
    return (
      parseInt(request.ask.slotSize, 10) *
      parseInt(request.ask.pricePerBytePerSecond, 10)
    );
  },
};
