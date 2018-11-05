import { LinearProgress, Paper, Typography } from "@material-ui/core";
import {
  compose,
  setDisplayName,
  withHandlers,
  withState,
  defaultProps
} from "recompose";
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
import Email from "components/Email";

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
  withState("showEmailBox", "setShowEmailBox", true),
  withState("isResendIsAllowed", "setIsResendIsAllowed", false),
  withState("units", "setUnits", []),
  withState("dateSubmittedAt", "setDateSubmittedAt", null),
  withHandlers({
    addUnit: ({ setUnits, units }) => unit => setUnits([...units, unit])
  }),
  withHandlers({
    onSubscriptionData: ({ addUnit, units, setIsResendIsAllowed }) => ({
      subscriptionData: {
        data: { nodeInfo }
      }
    }) => {
      addUnit(nodeInfo);

      /* TODO
       - Will explode
      */
      if (nodeInfo.status === "resolved") {
        setIsResendIsAllowed(true);
      }
    },
    onDisconnected: ({ units, addUnit, setIsResendIsAllowed }) => () => {
      const isUnitsAreFullyLoaded = isUnitsFullyLoaded(units);

      if (isUnitsAreFullyLoaded) {
        /*
        addUnit({
          id: Date.now(),
          type: "okay",
          title: "Connection succesfuly closed"
        });
        */
      } else {
        addUnit({
          id: Date.now(),
          type: "error",
          status: "resolved",
          title: "Connection exploded",
          description: "Please reload the page or try again"
        });
      }
      setIsResendIsAllowed(true);
    },
    onSubmit: ({
      setUnits,
      setDateSubmittedAt,
      setForm,
      setIsResendIsAllowed
    }) => form => {
      setIsResendIsAllowed(false);
      setUnits([]);
      setDateSubmittedAt(Date.now());
      setForm(form);
    }
  }),
  defaultProps({
    hash: window.location.hash
  }),
  setDisplayName("SubmitFormWithUnits")
)(
  ({
    form,
    hash,
    units,
    onSubmit,
    dateSubmittedAt,
    onSubscriptionData,
    onDisconnected,
    isResendIsAllowed,
    showEmailBox
  }) => (
    <ErrorBoundary>
      <ReportConnectionWS
        onDisconnected={onDisconnected}
        onError={onDisconnected}
      />

      <SubmitForm
        isResendIsAllowed={isResendIsAllowed}
        initialValues={convertHashToForm(hash)}
        onSubmit={onSubmit}
      />

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
                Direct link to this check
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
              <>
                <Typography
                  variant={"subtitle1"}
                  gutterBottom
                  align={"center"}
                  style={{ color: "white" }}
                >
                  All checks are done!
                </Typography>
                <Email />
              </>
            ) : (
              <LinearProgress />
            )}
          </React.Fragment>
        ) : null}
      </div>
    </ErrorBoundary>
  )
);
