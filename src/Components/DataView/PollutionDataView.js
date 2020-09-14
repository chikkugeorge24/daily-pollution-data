import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Result, Button, Empty } from 'antd';

import PollutionGraph from '../Graph/PollutionGrpah';
import useSpinner from '../Spinner/useSpinner';
import { dataURL, noDataImgURL } from '../../Common/Constants';

/** PollutionDataView loads the PollutionGraph */
const PollutionDataView = (props) => {
      const [pollutionData, setPollutionData] = useState([]);
      const [pollutionDataLength, setPollutionDataLength] = useState();
      const [responseStatus, setResponseStatus] = useState(200);
      const [spinner, showSpinner, hideSpinner] = useSpinner();
      const [isLoaded, setIsLoaded] = useState(true);
      const { city, date } = props.location;
      const DashBoardTitle = {
            fontWeight: "500",
            border: "inset",
            backgroundColor: "rgb(204 87 87 / 33%)",
            fontVariant: "petite-caps",
            fontSize: "x-large",
            marginTop: "10px",
            width: "60vw"
      };
      useEffect(() => {
            const fetchPollutionData = async () => {
                  try {
                        showSpinner();
                        const pollutionDataResponse = await axios.get(`${dataURL}&city=${city}&date_from=${date}&date_to=${date}`);
                        const pollutionDataResults = pollutionDataResponse.data.results;
                        const pollutionDataLength = pollutionDataResults.length;
                        setPollutionDataLength(pollutionDataLength);
                        if (pollutionDataLength) {
                              const groupedLocations = pollutionDataResults.reduce((result, current) => {
                                    result[current.location] = [...result[current.location] || [], current];
                                    return result;
                              }, {});
                              const pollutionDataArray = [];
                              for (const [location, value] of Object.entries(groupedLocations)) {
                                    const pollutionDataObj = {};
                                    value.forEach(element => {
                                          const { parameter, value } = element;
                                          pollutionDataObj[parameter] = value;
                                    });
                                    const splicedLocation = location.split(',');
                                    pollutionDataObj.location = splicedLocation[0];
                                    pollutionDataArray.push(pollutionDataObj);
                              }
                              setPollutionData(pollutionDataArray);
                        }
                        setTimeout(() => hideSpinner(), setIsLoaded(false), 1000);

                  } catch (error) {
                        if (error.response) {
                              setResponseStatus(error.response.status);
                        }
                        setTimeout(() => hideSpinner(), setIsLoaded(false), 20);
                  }
            };
            fetchPollutionData();
      }, []);

      const goBackToHomePage = () => {
            props.history.push('./pollution-data-check');
      };

      const graphTitle = (
            <Alert
                  message={`Pollution Data in ${city} On ${date}`}
                  style={DashBoardTitle} />
      );

      let dataOutput = spinner;
      if (!isLoaded) {
            if (responseStatus === 200) {
                  if (pollutionDataLength) {
                        dataOutput = (
                              <div className="col-8">
                                    {graphTitle}
                                    <PollutionGraph
                                          graphData={pollutionData} />
                              </div>
                        );

                  } else {
                        dataOutput = (
                              <div className="col-8">
                                    {graphTitle}
                                    <Empty
                                          image={noDataImgURL}
                                          imageStyle={{
                                                height: "50vh"
                                          }}
                                          description="Sorry... No data found."
                                    >
                                          <Button
                                                type="primary"
                                                onClick={goBackToHomePage}
                                          >Back Home</Button>
                                    </Empty>
                              </div>
                        );
                  }
            } else {
                  dataOutput = (
                        <div className="col-8">
                              <Result
                                    status="404"
                                    title="400"
                                    subTitle="Sorry..The page you visited doesn't exist."
                              />
                        </div>
                  );
            }
      }

      return (
            <div className="container-fluid h-100">
                  <div className="row h-100 justify-content-center">
                        {dataOutput}
                  </div>
            </div>

      );
};
export default PollutionDataView;
