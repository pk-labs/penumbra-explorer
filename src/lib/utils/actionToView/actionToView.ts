// istanbul ignore file
import {
    ActionDutchAuctionScheduleView,
    ActionDutchAuctionWithdrawView,
} from '@penumbra-zone/protobuf/penumbra/core/component/auction/v1/auction_pb'
import {
    SwapClaimView,
    SwapClaimView_Opaque,
    SwapView,
    SwapView_Opaque,
} from '@penumbra-zone/protobuf/penumbra/core/component/dex/v1/dex_pb'
import { ActionLiquidityTournamentVoteView_Opaque } from '@penumbra-zone/protobuf/penumbra/core/component/funding/v1/funding_pb'
import {
    DelegatorVoteView,
    DelegatorVoteView_Opaque,
} from '@penumbra-zone/protobuf/penumbra/core/component/governance/v1/governance_pb'
import {
    OutputView,
    OutputView_Opaque,
    SpendView,
    SpendView_Opaque,
} from '@penumbra-zone/protobuf/penumbra/core/component/shielded_pool/v1/shielded_pool_pb'
import {
    Action,
    ActionView,
} from '@penumbra-zone/protobuf/penumbra/core/transaction/v1/transaction_pb'

// https://github.com/penumbra-zone/dex-explorer/blob/main/src/pages/inspect/tx/api/as-action-view.ts
const actionToView = (action: Action): ActionView | undefined => {
    const payload = action?.action

    if (!payload) {
        return
    }

    switch (payload.case) {
        case 'spend':
            return new ActionView({
                actionView: {
                    case: 'spend',
                    value: new SpendView({
                        spendView: {
                            case: 'opaque',
                            value: new SpendView_Opaque({
                                spend: payload.value,
                            }),
                        },
                    }),
                },
            })
        case 'output':
            return new ActionView({
                actionView: {
                    case: 'output',
                    value: new OutputView({
                        outputView: {
                            case: 'opaque',
                            value: new OutputView_Opaque({
                                output: payload.value,
                            }),
                        },
                    }),
                },
            })
        case 'swap':
            return new ActionView({
                actionView: {
                    case: 'swap',
                    value: new SwapView({
                        swapView: {
                            case: 'opaque',
                            value: new SwapView_Opaque({
                                swap: payload.value,
                            }),
                        },
                    }),
                },
            })
        case 'swapClaim':
            return new ActionView({
                actionView: {
                    case: 'swapClaim',
                    value: new SwapClaimView({
                        swapClaimView: {
                            case: 'opaque',
                            value: new SwapClaimView_Opaque({
                                swapClaim: payload.value,
                            }),
                        },
                    }),
                },
            })
        case 'delegatorVote':
            return new ActionView({
                actionView: {
                    case: 'delegatorVote',
                    value: new DelegatorVoteView({
                        delegatorVote: {
                            case: 'opaque',
                            value: new DelegatorVoteView_Opaque({
                                delegatorVote: payload.value,
                            }),
                        },
                    }),
                },
            })
        case 'validatorDefinition':
            return new ActionView({
                actionView: {
                    case: 'validatorDefinition',
                    value: payload.value,
                },
            })
        case 'ibcRelayAction':
            return new ActionView({
                actionView: {
                    case: 'ibcRelayAction',
                    value: payload.value,
                },
            })
        case 'proposalSubmit':
            return new ActionView({
                actionView: {
                    case: 'proposalSubmit',
                    value: payload.value,
                },
            })
        case 'proposalWithdraw':
            return new ActionView({
                actionView: {
                    case: 'proposalWithdraw',
                    value: payload.value,
                },
            })
        case 'proposalDepositClaim':
            return new ActionView({
                actionView: {
                    case: 'proposalDepositClaim',
                    value: payload.value,
                },
            })
        case 'validatorVote':
            return new ActionView({
                actionView: {
                    case: 'validatorVote',
                    value: payload.value,
                },
            })
        case 'positionOpen':
            return new ActionView({
                actionView: {
                    case: 'positionOpen',
                    value: payload.value,
                },
            })
        case 'positionClose':
            return new ActionView({
                actionView: {
                    case: 'positionClose',
                    value: payload.value,
                },
            })
        case 'positionWithdraw':
            return new ActionView({
                actionView: {
                    case: 'positionWithdraw',
                    value: payload.value,
                },
            })
        case 'positionRewardClaim':
            return new ActionView({
                actionView: {
                    case: 'positionRewardClaim',
                    value: payload.value,
                },
            })
        case 'delegate':
            return new ActionView({
                actionView: {
                    case: 'delegate',
                    value: payload.value,
                },
            })
        case 'undelegate':
            return new ActionView({
                actionView: {
                    case: 'undelegate',
                    value: payload.value,
                },
            })
        case 'communityPoolSpend':
            return new ActionView({
                actionView: {
                    case: 'communityPoolSpend',
                    value: payload.value,
                },
            })
        case 'communityPoolOutput':
            return new ActionView({
                actionView: {
                    case: 'communityPoolOutput',
                    value: payload.value,
                },
            })
        case 'communityPoolDeposit':
            return new ActionView({
                actionView: {
                    case: 'communityPoolDeposit',
                    value: payload.value,
                },
            })
        case 'actionDutchAuctionSchedule':
            return new ActionView({
                actionView: {
                    case: 'actionDutchAuctionSchedule',
                    value: new ActionDutchAuctionScheduleView({
                        action: payload.value,
                    }),
                },
            })
        case 'actionDutchAuctionWithdraw':
            return new ActionView({
                actionView: {
                    case: 'actionDutchAuctionWithdraw',
                    value: new ActionDutchAuctionWithdrawView({
                        action: payload.value,
                    }),
                },
            })
        case 'actionDutchAuctionEnd':
            return new ActionView({
                actionView: {
                    case: 'actionDutchAuctionEnd',
                    value: payload.value,
                },
            })
        case 'undelegateClaim':
            return new ActionView({
                actionView: {
                    case: 'undelegateClaim',
                    value: payload.value,
                },
            })
        case 'ics20Withdrawal':
            return new ActionView({
                actionView: {
                    case: 'ics20Withdrawal',
                    value: payload.value,
                },
            })
        case 'actionLiquidityTournamentVote':
            return new ActionView({
                actionView: {
                    case: 'actionLiquidityTournamentVote',
                    value: {
                        liquidityTournamentVote: {
                            case: 'opaque',
                            value: new ActionLiquidityTournamentVoteView_Opaque(
                                { vote: payload.value }
                            ),
                        },
                    },
                },
            })
    }
}

export default actionToView
