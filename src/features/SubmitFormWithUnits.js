import { LinearProgress, Paper, Typography } from "@material-ui/core";
import { Subscription, withApollo } from "react-apollo";
import { compose, setDisplayName, withState } from "recompose";
import { convertFormToURL, getLabelKey } from "helpers.js";
import { flow, map } from "lodash/fp";

import { About } from "components/About";
import React from "react";
import ReportConnectionWS from "features/ReportConnectionWS";
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
  withState("dateSubmittedAt", "setDateSubmittedAt", null),
  withApollo,
  setDisplayName("SubmitFormWithUnits")
)(({ setForm, form, units, setUnits, dateSubmittedAt, setDateSubmittedAt }) => (
  <>
    <Paper>
      <ReportConnectionWS />
      <div style={{ padding: "20px" }}>
        <Typography variant={"h4"} align={"center"} gutterBottom>
          Crypto Checker v0.2.0
        </Typography>
        <SubmitForm
          onSubmit={form => {
            setUnits([]);
            setDateSubmittedAt(Date.now());
            setForm(form);
          }}
        />
      </div>
    </Paper>
    <br />
    {dateSubmittedAt ? null : <About />}
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
          {dateSubmittedAt ? (
            <SubscriptionForNewUnits
              variables={{
                url: convertFormToURL(form),
                dateSubmittedAt
              }}
              onSubscriptionData={data => {
                const unit = data.subscriptionData.data.unitAdded;
                setUnits([...units, unit]);
              }}
            />
          ) : null}
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
