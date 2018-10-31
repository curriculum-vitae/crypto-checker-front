import { LinearProgress, Paper, Typography } from "@material-ui/core";
import { compose, setDisplayName, withHandlers, withState } from "recompose";
import { convertFormToURL, getLabelKey } from "helpers.js";
import { flow, map, replace, split } from "lodash/fp";

import { About } from "components/About";
import ErrorBoundary from "components/ErrorBoundary";
import React from "react";
import ReportConnectionWS from "features/ReportConnectionWS";
import { SubmitForm } from "features/SubmitForm";
import { Subscription } from "react-apollo";
import { Unit } from "components/Unit";
import { blue } from "@material-ui/core/colors";
import gql from "graphql-tag";
import { isUnitsFullyLoaded } from "helpers.js";

const UNITS_SUBSCRIPTION = gql`
  subscription onUnitAdded($url: String!) {
    nodeInfo(url: $url) {
      id
      status
      type
      title
      description
      details
    }
  }
`;

const convertHashToForm = flow(
  replace("#", ""),
  split("/"),
  arr => {
    try {
      return {
        coin: arr[0],
        ip: arr[1].split(":")[0],
        port: arr[1].split(":")[1]
      };
    } catch (e) {
      return {};
    }
  }
);

const convertFormToHash = form =>
  `#${getLabelKey(form.coin)}/${form.ip}:${form.port}`;

export const SubmitFormWithUnits = compose(
  withState("form", "setForm"),
  withState("units", "setUnits", []),
  withState("dateSubmittedAt", "setDateSubmittedAt", null),
  withHandlers({
    onSubscriptionData: ({ setUnits, units }) => data => {
      const unit = data.subscriptionData.data.nodeInfo;
      setUnits([...units, unit]);
    }
  }),
  withState("hashFromURL", "setHashFromURL", () => window.location.hash),
  setDisplayName("SubmitFormWithUnits")
)(
  ({
    setForm,
    form,
    hashFromURL,
    units,
    setUnits,
    dateSubmittedAt,
    setDateSubmittedAt,
    onSubscriptionData
  }) => (
    <ErrorBoundary>
      <Paper>
        <ReportConnectionWS />
        <div style={{ padding: "20px" }}>
          <Typography variant={"h4"} align={"center"} gutterBottom>
            Let's check your node!
          </Typography>
          <SubmitForm
            initialValues={convertHashToForm(hashFromURL)}
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
            <a href={convertFormToHash(form)}>
              <Typography
                variant={"subtitle1"}
                gutterBottom
                align={"right"}
                style={{ color: blue[700] }}
              >
                Permalink link
              </Typography>
            </a>
            <Subscription
              subscription={UNITS_SUBSCRIPTION}
              variables={{
                url: convertFormToURL(form),
                dateSubmittedAt
              }}
              onSubscriptionData={onSubscriptionData}
            />
            {flow(
              map(unit => (
                <div key={unit.id} style={{ marginBottom: "20px" }}>
                  <Unit unit={unit} />
                </div>
              ))
            )(units)}
            {isUnitsFullyLoaded(units) ? (
              <Typography variant={"subtitle1"} gutterBottom align={"center"}>
                All checks are done!
              </Typography>
            ) : (
              <LinearProgress />
            )}
          </React.Fragment>
        ) : null}
      </div>
    </ErrorBoundary>
  )
);
