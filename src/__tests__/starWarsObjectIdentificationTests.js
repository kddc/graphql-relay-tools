// @flow

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This file has been adapted from the test case contained
 *  in graphql-relay-js. All credits goes to this library.
 */

import { StarWarsSchema } from "./starWarsSchema";
import { graphql } from "graphql";

describe("Star Wars object identification", () => {
  it("fetches the ID and name of the rebels", async () => {
    const query = `
      query RebelsQuery {
        rebels {
          id
          name
        }
      }
    `;
    const expected = {
      rebels: {
        id: "RmFjdGlvbjox",
        name: "Alliance to Restore the Republic"
      }
    };
    const result = await graphql(StarWarsSchema, query);
    expect(result).toEqual({ data: expected });
  });

  it("refetches the rebels", async () => {
    const query = `
      query RebelsRefetchQuery {
        node(id: "RmFjdGlvbjox") {
          id
          ... on Faction {
            name
          }
        }
      }
    `;
    const expected = {
      node: {
        id: "RmFjdGlvbjox",
        name: "Alliance to Restore the Republic"
      }
    };
    const result = await graphql(StarWarsSchema, query);
    expect(result).toEqual({ data: expected });
  });

  it("fetches the ID and name of the empire", async () => {
    const query = `
      query EmpireQuery {
        empire {
          id
          name
        }
      }
    `;
    const expected = {
      empire: {
        id: "RmFjdGlvbjoy",
        name: "Galactic Empire"
      }
    };
    const result = await graphql(StarWarsSchema, query);
    expect(result).toEqual({ data: expected });
  });

  it("refetches the empire", async () => {
    const query = `
      query EmpireRefetchQuery {
        node(id: "RmFjdGlvbjoy") {
          id
          ... on Faction {
            name
          }
        }
      }
    `;
    const expected = {
      node: {
        id: "RmFjdGlvbjoy",
        name: "Galactic Empire"
      }
    };
    const result = await graphql(StarWarsSchema, query);
    expect(result).toEqual({ data: expected });
  });

  it("refetches the X-Wing", async () => {
    const query = `
      query XWingRefetchQuery {
        node(id: "U2hpcDox") {
          id
          ... on Ship {
            name
          }
        }
      }
    `;
    const expected = {
      node: {
        id: "U2hpcDox",
        name: "X-Wing"
      }
    };
    const result = await graphql(StarWarsSchema, query);
    expect(result).toEqual({ data: expected });
  });
});
