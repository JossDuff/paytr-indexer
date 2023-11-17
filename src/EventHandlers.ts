/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  PaytrContract_ContractParametersUpdatedEvent_loader,
  PaytrContract_ContractParametersUpdatedEvent_handler,
  PaytrContract_InterestPayoutEvent_loader,
  PaytrContract_InterestPayoutEvent_handler,
  PaytrContract_OwnershipTransferred_loader,
  PaytrContract_OwnershipTransferred_handler,
  PaytrContract_Paused_loader,
  PaytrContract_Paused_handler,
  PaytrContract_PayOutERC20Event_loader,
  PaytrContract_PayOutERC20Event_handler,
  PaytrContract_PaymentERC20Event_loader,
  PaytrContract_PaymentERC20Event_handler,
  PaytrContract_Unpaused_loader,
  PaytrContract_Unpaused_handler,
} from "../generated/src/Handlers.gen";

import {
  ContractParametersUpdatedEventEntity,
  InterestPayoutEventEntity,
  OwnershipTransferredEntity,
  PausedEntity,
  PayOutERC20EventEntity,
  PaymentERC20EventEntity,
  UnpausedEntity,
  EventsSummaryEntity
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  contractParametersUpdatedEventsCount: BigInt(0),
  interestPayoutEventsCount: BigInt(0),
  ownershipTransferredsCount: BigInt(0),
  pausedsCount: BigInt(0),
  payOutERC20EventsCount: BigInt(0),
  paymentERC20EventsCount: BigInt(0),
  unpausedsCount: BigInt(0),
};

PaytrContract_ContractParametersUpdatedEvent_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PaytrContract_ContractParametersUpdatedEvent_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    contractParametersUpdatedEventsCount: currentSummaryEntity.contractParametersUpdatedEventsCount + BigInt(1),
  };

  let contractParametersUpdatedEventEntity: ContractParametersUpdatedEventEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    feeModifier: event.params.feeModifier,
    minDueDateParameter: event.params.minDueDateParameter,
    maxDueDateParameter: event.params.maxDueDateParameter,
    minAmount: event.params.minAmount,
    maxAmount: event.params.maxAmount,
    maxPayoutArraySize: event.params.maxPayoutArraySize,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ContractParametersUpdatedEvent.set(contractParametersUpdatedEventEntity);
});

PaytrContract_InterestPayoutEvent_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PaytrContract_InterestPayoutEvent_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    interestPayoutEventsCount: currentSummaryEntity.interestPayoutEventsCount + BigInt(1),
  };

  let interestPayoutEventEntity: InterestPayoutEventEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    tokenAddress: event.params.tokenAddress,
    payee: event.params.payee,
    interestAmount: event.params.interestAmount,
    paymentReference: event.params.paymentReference,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.InterestPayoutEvent.set(interestPayoutEventEntity);
});

PaytrContract_OwnershipTransferred_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PaytrContract_OwnershipTransferred_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ownershipTransferredsCount: currentSummaryEntity.ownershipTransferredsCount + BigInt(1),
  };

  let ownershipTransferredEntity: OwnershipTransferredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.OwnershipTransferred.set(ownershipTransferredEntity);
});

PaytrContract_Paused_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PaytrContract_Paused_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    pausedsCount: currentSummaryEntity.pausedsCount + BigInt(1),
  };

  let pausedEntity: PausedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    account: event.params.account,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Paused.set(pausedEntity);
});

PaytrContract_PayOutERC20Event_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PaytrContract_PayOutERC20Event_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    payOutERC20EventsCount: currentSummaryEntity.payOutERC20EventsCount + BigInt(1),
  };

  let payOutERC20EventEntity: PayOutERC20EventEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    tokenAddress: event.params.tokenAddress,
    payee: event.params.payee,
    feeAddress: event.params.feeAddress,
    amount: event.params.amount,
    paymentReference: event.params.paymentReference,
    feeAmount: event.params.feeAmount,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.PayOutERC20Event.set(payOutERC20EventEntity);
});

PaytrContract_PaymentERC20Event_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PaytrContract_PaymentERC20Event_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    paymentERC20EventsCount: currentSummaryEntity.paymentERC20EventsCount + BigInt(1),
  };

  let paymentERC20EventEntity: PaymentERC20EventEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    tokenAddress: event.params.tokenAddress,
    payee: event.params.payee,
    feeAddress: event.params.feeAddress,
    amount: event.params.amount,
    dueDate: event.params.dueDate,
    feeAmount: event.params.feeAmount,
    paymentReference: event.params.paymentReference,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.PaymentERC20Event.set(paymentERC20EventEntity);
});

PaytrContract_Unpaused_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PaytrContract_Unpaused_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    unpausedsCount: currentSummaryEntity.unpausedsCount + BigInt(1),
  };

  let unpausedEntity: UnpausedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    account: event.params.account,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Unpaused.set(unpausedEntity);
});

