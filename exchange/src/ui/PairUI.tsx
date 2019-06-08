import React, { Component, Fragment } from 'react';
import classes from './PairUI.module.css';

export default class PairUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'default',
      amount: '0',
    }
    this.assetA = this.getAsset(props.pair.assetA);
    this.assetB = this.getAsset(props.pair.assetB);
  }

  getAsset(id) {
    for (const asset of this.props.assets) {
      if (asset.id === id) {
        return asset;
      }
    }
    throw new Error(`Could not find asset ${id}`);
  }

  buttons() {
    const { pair } = this.props
    return (
      <Fragment>
        <button className={classes.exchangeBtn} onClick={() => this.setState({ mode: 'AtoB' })}>
          {this.assetA.name} to {this.assetB.name}
        </button>
        <button className={classes.exchangeBtn} onClick={() => this.setState({ mode: 'BtoA' })}>
          {this.assetB.name} to {this.assetA.name}
        </button>
      </Fragment>
    );
  }

  form() {
    const { mode, amount } = this.state;
    const { assetA, assetB } = this;
    return (
      <Fragment>
        <div>
          {mode === 'AtoB' ? `${assetA.name} to ${assetB.name}` : `${assetB.name} to ${assetA.name}`}
        </div>
        <input type="number" value={amount} onChange={e => this.setState({ amount: e.target.value })} />
        <button type="button" onClick={() => this.setState({ mode: 'default', amount: '0' })}>
          Cancel
        </button>
        <button type="button" onClick={() => this.setState({ mode: 'default', amount: '0' })}>
          Exchange
        </button>
      </Fragment>
    );
  }

  render() {
    return (
      <div className={classes.pair}>
        {this.state.mode === 'default' ? this.buttons() : this.form()}
      </div>
    );
  }
}