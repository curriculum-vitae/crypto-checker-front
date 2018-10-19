import { LinearProgress, Paper, Typography } from "@material-ui/core";
import { Mutation, Subscription, withApollo } from "react-apollo";
import { compose, setDisplayName, withState } from "recompose";
import { convertFormToURL, getLabelKey } from "helpers.js";
import { flow, map } from "lodash/fp";
import { green, orange, red } from "@material-ui/core/colors";

import { Detector } from "react-detect-offline";
import React from "react";
import { SubmitForm } from "features/SubmitForm";
import { Unit } from "components/Unit";
import { blue } from "@material-ui/core/colors";
import gql from "graphql-tag";
import { isUnitsFullyLoaded } from "helpers.js";

const UNITS_SUBSCRIPTION = gql`
  subscription onUnitAdded($url: String!) {
    unitAdded(url: $url) {
      id
      status
      type
      title
      description
      details
    }
  }
`;

const ADD_URL = gql`
  mutation units($url: String!) {
    urlAdd(url: $url) {
      id
      status
      type
      title
      description
      details
    }
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const SubscriptionForNewUnits = ({ variables, onSubscriptionData }) => (
  <ErrorBoundary>
    <Subscription
      subscription={UNITS_SUBSCRIPTION}
      variables={variables}
      onSubscriptionData={onSubscriptionData}
    >
      {({ loading, error, data }) => {
        if (error) {
          console.log(error);
          return "Error";
        }
        return null;
      }}
    </Subscription>
  </ErrorBoundary>
);

export const SubmitFormWithUnits = compose(
  withState("form", "setForm"),
  withState("units", "setUnits", []),
  withApollo,
  setDisplayName("SubmitFormWithUnits")
)(({ setForm, form, units, setUnits }) => (
  <>
    <Paper>
      <Detector
        render={({ online }) =>
          online ? null : (
            <Typography
              variant={"button"}
              style={{
                padding: "10px",
                backgroundColor: online ? green[600] : red[600],
                color: "white"
              }}
              align={"center"}
            >
              {online ? "You're online" : "You are offline"}
            </Typography>
          )
        }
      />
      <div style={{ padding: "20px" }}>
        <Typography variant={"h4"} align={"center"} gutterBottom>
          Crypto Checker v0.2.0
        </Typography>
        <Mutation mutation={ADD_URL}>
          {addURL => (
            <SubmitForm
              onSubmit={form => {
                addURL({ variables: { url: convertFormToURL(form) } });
                setUnits([]);
                setForm(form);
              }}
            />
          )}
        </Mutation>
      </div>
    </Paper>

    <br />
    <br />
    <div
      style={{
        minHeight: "320px"
      }}
    >
      {!!form ? (
        <React.Fragment key={convertFormToURL(form)}>
          <a href={`#${getLabelKey(form.coin)}/${form.ip}:${form.port}`}>
            <Typography
              variant={"subtitle1"}
              gutterBottom
              align={"right"}
              style={{ color: blue[700] }}
            >
              Permalink link
            </Typography>
          </a>
          <SubscriptionForNewUnits
            variables={{
              url: convertFormToURL(form)
            }}
            onSubscriptionData={data => {
              const unit = data.subscriptionData.data.unitAdded;
              setUnits([...units, unit]);
            }}
          />

          {flow(
            map(unit => (
              <React.Fragment key={unit.id}>
                <Unit unit={unit} />
                <br />
              </React.Fragment>
            ))
          )(units)}

          {isUnitsFullyLoaded(units) ? (
            <>
              <Typography variant={"subtitle1"} gutterBottom align={"center"}>
                All checks are done!
              </Typography>
            </>
          ) : (
            <LinearProgress />
          )}
        </React.Fragment>
      ) : null}
    </div>
  </>
));
