import { LinearProgress, Paper, Typography } from "@material-ui/core";
import { Mutation, Subscription, withApollo } from "react-apollo";
import { compose, setDisplayName, withState } from "recompose";
import { convertFormToURL, getLabelKey } from "helpers.js";
import { flow, map } from "lodash/fp";

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

const SubscriptionForNewUnits = ({ variables, onSubscriptionData }) => (
  <Subscription
    subscription={UNITS_SUBSCRIPTION}
    variables={variables}
    onSubscriptionData={onSubscriptionData}
  >
    {({ loading, error, data }) => null}
  </Subscription>
);

export const SubmitFormWithUnits = compose(
  withState("form", "setForm"),
  withState("units", "setUnits", []),
  withApollo,
  setDisplayName("SubmitFormWithUnits")
)(({ setForm, form, units, setUnits }) => (
  <>
    <Paper style={{ padding: "20px" }}>
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
