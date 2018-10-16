import { Mutation, Subscription, withApollo } from "react-apollo";
import { Paper, Typography } from "@material-ui/core";
import { compose, withHandlers, withState } from "recompose";

import React from "react";
import { SubmitForm } from "features/SubmitForm";
import { convertFormToURL } from "helpers.js";
import gql from "graphql-tag";

const UNITS_SUBSCRIPTION = gql`
  subscription onUnitAdded($url: String!) {
    unitAdded(url: $url) {
      id
      status
      title
      description
    }
  }
`;

const ADD_URL = gql`
  mutation units($url: String!) {
    urlAdd(url: $url) {
      id
      status
      title
      description
    }
  }
`;

const SubscriptionForNewUnits = ({ variables }) => (
  <Subscription subscription={UNITS_SUBSCRIPTION} variables={variables}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.message}</p>;
      return JSON.stringify(data);
    }}
  </Subscription>
);

export const SubmitFormWithUnits = compose(
  withState("forms", "setForms", []),
  withState("units", "setUnits", []),
  withHandlers({
    addToForms: ({ setForms, forms }) => form => setForms([...forms, form])
  }),
  withApollo
)(({ addToForms, forms, units }) => (
  <>
    <br />
    <br />
    <Paper style={{ padding: "20px" }}>
      <Mutation mutation={ADD_URL}>
        {addURL => (
          <SubmitForm
            onSubmit={form => {
              addToForms(form);
              addURL({ variables: { url: convertFormToURL(form) } });
            }}
          />
        )}
      </Mutation>
    </Paper>
    <br />
    <br />
    {forms.map(form => (
      <React.Fragment key={convertFormToURL(form)}>
        <Typography variant={"caption"}>
          News about <b>{convertFormToURL(form)}</b>
        </Typography>
        <SubscriptionForNewUnits
          variables={{
            url: convertFormToURL(form)
          }}
        />

        <Paper style={{ padding: "20px", marginBottom: "20px" }}>
          Count of units
          {units.length}
        </Paper>
      </React.Fragment>
    ))}
  </>
));
