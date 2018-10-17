import {
  Icon,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography
} from "@material-ui/core";
import { Mutation, Subscription, withApollo } from "react-apollo";
import {
  compose,
  setDisplayName,
  withHandlers,
  withProps,
  withState
} from "recompose";
import { find, flow, map } from "lodash/fp";

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

const isUnitsFullyLoaded = find(unit => unit.status === "resolved");

const SubscriptionForNewUnits = ({ variables, onSubscriptionData }) => (
  <Subscription
    subscription={UNITS_SUBSCRIPTION}
    variables={variables}
    onSubscriptionData={onSubscriptionData}
  >
    {({ loading, error, data }) => {
      return null;
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.message}</p>;
      return JSON.stringify(data);
    }}
  </Subscription>
);

export const SubmitFormWithUnits = compose(
  withState("form", "setForm"),
  withState("units", "setUnits", []),
  withApollo,
  setDisplayName("SubmitFormWithUnits")
)(({ setForm, form, units, setUnits }) => (
  <>
    <br />
    <br />
    <Paper style={{ padding: "20px" }}>
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
    {!!form ? (
      <div
        style={{
          minHeight: "400px"
        }}
        key={convertFormToURL(form)}
      >
        <Typography variant={"caption"}>
          News about <b>{convertFormToURL(form)}</b>
        </Typography>
        <SubscriptionForNewUnits
          variables={{
            url: convertFormToURL(form)
          }}
          onSubscriptionData={data => {
            const unit = data.subscriptionData.data.unitAdded;
            setUnits([...units, unit]);
          }}
        />

        <Paper>
          <List>
            {flow(
              map(unit => (
                <ListItem key={unit.id} dense>
                  <ListItemIcon>
                    <Icon>info</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={unit.title}
                    secondary={unit.description}
                  />
                </ListItem>
              ))
            )(units)}
          </List>

          {isUnitsFullyLoaded(units) ? null : <LinearProgress />}
        </Paper>
      </div>
    ) : null}
  </>
));
