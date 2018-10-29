import React from "react";
import { storiesOf } from "@storybook/react";
import CustomTable from "../components/CustomTable";

const bodyStyle = {
  display: "grid",
  placeContent: "center"
};

const mockedData = [...Array(300)].map((_, id) => ({
  title: `Title ${id}`,
  score: Math.floor(Math.random() * 100),
  scoreMainInd: Math.floor(Math.random() * 100),
  count: Math.floor(Math.random() * 100),
  count2: Math.floor(Math.random() * 100),
  count3: Math.floor(Math.random() * 100),
  count4: Math.floor(Math.random() * 100)
}));

storiesOf("Custom Table", module)
  .add("Virtualization", () => (
    <div style={bodyStyle}>
      <div style={{ width: 1000 }}>
        <CustomTable
          data={mockedData}
          def={{
            title: {},
            score: {
              graph: "bar",
              width: "50%"
            },
            count: {
              style: { fontWeight: 700 }
            }
          }}
          options={{
            virtualize: true,
            defaultSortDim: "ocena",
            theme: {
              tableStyle: {
                height: 650
              },
              rowStyle: {
                margin: `20px 0`,
                height: 30
              },
              colorScheme: ["rgb(50,150,50)", "rgb(200, 200, 200)"]
            }
          }}
        />
      </div>
    </div>
  ))
  .add("No Virtualization", () => (
    <div style={bodyStyle}>
      <div style={{ width: 1000 }}>
        <CustomTable
          data={mockedData}
          def={{
            title: {},
            score: {
              graph: "bar",
              width: "50%"
            },
            count: {
              style: { fontWeight: 700 }
            }
          }}
          options={{
            virtualize: false,
            defaultSortDim: "ocena",
            style: {
              margin: `20px 0`,
              height: 30
            },
            colorScheme: ["rgb(50,150,50)", "rgb(200, 200, 200)"]
          }}
        />
      </div>
    </div>
  ))
  .add("Main indicator", () => (
    <div style={bodyStyle}>
      <div style={{ width: 1000 }}>
        <CustomTable
          data={mockedData}
          def={{
            title: {},
            score: {
              graph: "bar",
              width: "50%",
              indicators: ["count", "count2", "count3"]
            },
            count: {
              style: { fontWeight: 700 }
            },
            count2: {
              style: { fontWeight: 700 }
            },
            count3: {
              style: { fontWeight: 700 }
            },
            count4: {
              style: { fontWeight: 700 }
            }
          }}
          options={{
            virtualize: true,
            defaultSortDim: "ocena",
            theme: {
              tableStyle: {
                height: 700,
                fontFamily: "Arial"
              },
              rowStyle: {
                margin: "30px 0",
                height: 30
              },
              colorScheme: ["rgb(50,150,50)", "rgb(200, 200, 200)"]
            }
          }}
        />
      </div>
    </div>
  ))
  .add("Main indicator - size test", () => (
    <div style={bodyStyle}>
      <div style={{ width: 1000 }}>
        <CustomTable
          data={mockedData}
          def={{
            title: {},
            score: {
              graph: "bar",
              width: "50%",
              options: {
                indicators: {
                  main: true,
                  mainData: [...Array(300)].map(v =>
                    Math.floor(Math.random() * 101)
                  ),
                  mainTitle: "previous"
                }
              }
            },
            count: {
              style: { fontWeight: 700 }
            },
            count2: {
              style: { fontWeight: 700 }
            },
            count3: {
              style: { fontWeight: 700 }
            },
            count4: {
              style: { fontWeight: 700 }
            }
          }}
          options={{
            virtualize: true,
            defaultSortDim: "ocena",
            theme: {
              tableStyle: {
                height: 700,
                fontFamily: "Arial"
              },
              rowStyle: {
                margin: "30px 0",
                height: 60
              }
            },
            colorScheme: ["rgb(50,150,50)", "rgb(200, 200, 200)"]
          }}
        />
      </div>
    </div>
  ));
