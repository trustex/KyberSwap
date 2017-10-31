import React from "react"
import { connect } from "react-redux"
import { push } from 'react-router-redux';
//import Key from "./Elements/Key"
//import { TokenSelect } from '../../components/Token'
import constants from "../../services/constants"


@connect((store, props) => {
    if (props.broadcasting) {
        return { broadcasting: true, error:"" }        
    } else {
        if (props.broadcastingError !== ""){
            return { broadcasting: true, error: props.broadcastingError }        
        }
        return {
            ...props.tempTx, broadcasting: false
            , makeNewTransaction: props.makeNewTransaction
            , type: props.type
            , balanceInfo: props.balanceInfo
            , txHash: props.tx
        }
    }
})

export default class TransactionLoading extends React.Component {
    render() {
        if (this.props.broadcasting) {
            var classPending = this.props.error === "" ? " pulse" : ""
            return (
                <div>
                    <div class="frame">
                        <div class="row">
                            <div class="column small-11 medium-9 large-8 small-centered">
                                <h1 class="title text-center">Broadcast
                            </h1>
                                <div class="row">
                                    <div class="column medium-3 text-center">
                                    <div className={"broadcast-animation animated infinite" + classPending}>
                                        {this.props.error === "" ? <img src="/assets/img/broadcast.svg" /> : <img src="/assets/img/finish.svg" />}
                                    </div>
                                    </div>
                                    <div class="column medium-9">
                                        <ul class="broadcast-steps">
                                            {this.props.error ==="" &&
                                                <li class="pending">Broadcasting your transaction to network</li>
                                            }
                                            {this.props.error !=="" &&
                                                <li class="failed">
                                                    Couldn't broadcast your transaction to the blockchain
                                                    <div class="reason">{this.props.error}</div>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column small-11 medium-10 large-9 small-centered text-center">
                            <p class="note">You can now close your browser window or make another {this.props.type == 'exchange' ? "exchange" : "transfer"}</p><a class="button accent" onClick={this.props.makeNewTransaction}>{this.props.type == 'exchange' ? "Exchange" : "Transfer"}</a>
                        </div>
                    </div>
                </div>
            )
        }
        var classPending = this.props.status === "pending" ? " pulse" : ""
        return (
            // <div>
            //     <div>{this.props.hash}</div>
            //     <div>{this.props.status}</div>
            //     <a onClick={this.props.makeNewTransaction}>continue {this.props.type}</a> | 
            // </div>
            <div>
                <div class="frame">
                    <div class="row">
                        <div class="column small-11 medium-9 large-8 small-centered">
                            <h1 class="title text-center">Broadcast

                                    <div class="info">Transaction&nbsp;
                                <br class="show-for-small-only"></br>
                                    <a class="hash has-tip top" data-tooltip title="View on Etherscan" href={constants.KOVAN_ETH_URL + 'tx/' + this.props.txHash} target="_blank">
                                        {this.props.txHash.slice(0, 12)} ... {this.props.txHash.slice(-10)}
                                    </a>
                                </div>

                            </h1>
                            <div class="row">
                                <div class="column medium-3 text-center">
                                    <div className={"broadcast-animation animated infinite" + classPending}>
                                        {this.props.status == "pending" ? <img src="/assets/img/broadcast.svg" /> : <img src="/assets/img/finish.svg" />}
                                    </div>
                                </div>
                                <div class="column medium-9">
                                    <ul class="broadcast-steps">
                                        {this.props.status === "success" &&
                                            <li class={this.props.status}>
                                                Broadcasted your transaction to the blockchain
                                                <p class="note">Current address balance</p>
                                                {this.props.type === "exchange" &&
                                                    <ul class="address-balances">
                                                        <li>
                                                            <span class="name">{this.props.balanceInfo.sourceTokenName}</span>
                                                            <span class="balance">{this.props.balanceInfo.sourceAmount} {this.props.balanceInfo.sourceTokenSymbol}</span>
                                                        </li>
                                                        <li>
                                                            <span class="name">{this.props.balanceInfo.destTokenName}</span>
                                                            <span class="balance">{this.props.balanceInfo.destAmount} {this.props.balanceInfo.destTokenSymbol}</span>
                                                        </li>
                                                    </ul>
                                                }
                                                {this.props.type === "transfer" &&
                                                    <ul class="address-balances">
                                                        <li>
                                                            <span class="name">{this.props.balanceInfo.tokenName}</span>
                                                            <span class="balance">{this.props.balanceInfo.amount} {this.props.balanceInfo.tokenSymbol}</span>
                                                        </li>
                                                    </ul>
                                                }
                                            </li>
                                        }
                                        {this.props.status === "failed" &&
                                            <li class={this.props.status}>
                                                Transaction error
                                                <div class="reason">{this.props.error}</div>
                                            </li>
                                        }
                                        {this.props.status === "pending" &&
                                            <li class={this.props.status}>Waiting for your transaction to be mined</li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="column small-11 medium-10 large-9 small-centered text-center">
                        <p class="note">You can now close your browser window or make another {this.props.type == 'exchange' ? "exchange" : "transfer"}</p><a class="button accent" onClick={this.props.makeNewTransaction}>{this.props.type == 'exchange' ? "Exchange" : "Transfer"}</a>
                    </div>
                </div>
            </div>
        )
    }
}