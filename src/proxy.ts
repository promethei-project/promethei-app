import {
  PrometheiCreateStorageRequestInput,
  PrometheiData,
  PrometheiMarketplace,
  SafeValue,
} from "@promethei-project/promethei-sdk-js";
import { PrometheiSdk as Sdk } from "./sdk/promethei";
import { WebStorage } from "./utils/web-storage";

class PrometheiDataMock extends PrometheiData {}

class PrometheiMarketplaceMock extends PrometheiMarketplace {
  // override async purchases(): Promise<SafeValue<PrometheiPurchase[]>> {
  //   const res = await super.purchases()

  //   if (res.error) {
  //     return res
  //   }

  //   const defaultDate = new Date(0, 0, 0, 0, 0, 0).toJSON()
  //   const dates = await Promise.all(res.data.map(p => PurchaseDatesStorage.get(p.requestId)))

  //   return {
  //     error: false, data: res.data
  //       .map((p, index) => ({ ...p, createdAt: new Date(dates[index] || defaultDate).getTime() }))
  //       .sort((a, b) => b.createdAt - a.createdAt)
  //   }
  // }

  /**
   * Maintains a temporary link between the CID and the file metadata.
   * When the metadata is available in the manifest, the CID link
   * should still be maintained, but the metadata should be retrieved
   * using a REST API call.
   */
  override async createStorageRequest(
    input: PrometheiCreateStorageRequestInput
  ): Promise<SafeValue<string>> {
    console.info(input);
    const res = await super.createStorageRequest(input);

    if (res.error) {
      console.error(res.data);
      return res;
    }

    await WebStorage.purchases.set("0x" + res.data, input.cid);

    // await PurchaseDatesStorage.set(res.data, new Date().toJSON())

    return res;
  }

  // override createStorageRequest(
  //   input: PrometheiCreateStorageRequestInput
  // ): Promise<SafeValue<string>> {
  //   return Promise.resolve({
  //     error: true,
  //     data: {
  //       message: "C'est balo",
  //     },
  //   });
  // }
  // override createAvailability(): Promise<
  //   SafeValue<PrometheiAvailabilityCreateResponse>
  // > {
  //   return Promise.resolve({
  //     error: true,
  //     data: {
  //       message: "C'est balo",
  //     },
  //   });
  // }
  // override reservations(): Promise<SafeValue<PrometheiReservation[]>> {
  //   return Promise.resolve({
  //     error: false,
  //     data: [
  //       {
  //         id: "0x123456789",
  //         availabilityId: "0x12345678910",
  //         requestId: "0x1234567891011",
  //         /**
  //          * Size in bytes
  //          */
  //         size: 500_000_000 + "",
  //         /**
  //          * Slot Index as hexadecimal string
  //          */
  //         slotIndex: "2",
  //       },
  //       {
  //         id: "0x987654321",
  //         availabilityId: "0x9876543210",
  //         requestId: "0x98765432100",
  //         /**
  //          * Size in bytes
  //          */
  //         size: 500_000_000 + "",
  //         /**
  //          * Slot Index as hexadecimal string
  //          */
  //         slotIndex: "1",
  //       },
  //     ],
  //   });
  // }

  // override reservations(): Promise<SafeValue<PrometheiReservation[]>> {
  //   return Promise.resolve({
  //     error: false,
  //     data: [
  //       {
  //         id: "0x123456789",
  //         availabilityId: "0x12345678910",
  //         requestId: "0x1234567891011",
  //         size: GB * 0.5 + "",
  //         slotIndex: "2",
  //       },
  //       {
  //         id: "0x987654321",
  //         availabilityId: "0x9876543210",
  //         requestId: "0x98765432100",
  //         /**
  //          * Size in bytes
  //          */
  //         size: GB * 0.25 + "",
  //         /**
  //          * Slot Index as hexadecimal string
  //          */
  //         slotIndex: "1",
  //       },
  //     ],
  //   });
  // }
}

export const PrometheiSdk = {
  ...Sdk,
  marketplace: () => new PrometheiMarketplaceMock(PrometheiSdk.url()),
  data: () => new PrometheiDataMock(PrometheiSdk.url()),
};
