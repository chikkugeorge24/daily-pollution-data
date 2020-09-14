import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Card, Form, Button, Select, DatePicker } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';

import { citiesURL } from '../../Common/Constants';
const { Option } = Select;

/** PollutionDataCheck - Entry point to view the Daily Pollution Data */
const PollutionDataCheck = (props) => {
      const [cities, setCities] = useState([]);
      useEffect(() => {
            const fetchCityData = async () => {
                  try {
                        const cityDataResponse = await axios.get(citiesURL);
                        const cityDataResults = cityDataResponse.data.results;
                        const groupedCityData = cityDataResults.reduce((result, current) => {
                              result[current.city] = [...result[current.city] || [], current];
                              return result;
                        }, {});
                        const cities = Object.keys(groupedCityData);
                        setCities(cities);
                  } catch (error) {
                        throw Error(error.message);
                  }
            };
            fetchCityData();
      }, []);
      const cardStyle = {
            borderRadius: "16px",
            backgroundColor: "rgb(204 87 87 / 33%)",
            boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
            fontVariant: "petite-caps",
            top: "100px",
            position: "relative"
      }
      const loadGrpahData = (formValues) => {
            const { city, date } = formValues;
            const formattedDate = moment(date).format("YYYY-MM-DD");
            props.history.push({
                  pathname: '/pollution-data-view',
                  city,
                  date: formattedDate
            });
      }
      return (
            <div className="container-fluid h-100">
                  <div className="row h-100 justify-content-center">
                        <div className="col-md-3">
                              <Card
                                    bordered={true}
                                    title="Daily Pollution Data"
                                    style={cardStyle}>
                                    <Form onFinish={loadGrpahData}>
                                          <div className="d-flex" >
                                                <Form.Item
                                                      name="city"
                                                      rules={[{
                                                            required: true,
                                                            message: "You missed to select the City"
                                                      }]}
                                                      style={{ width: "-webkit-fill-available" }}>
                                                      <Select
                                                            showSearch
                                                            placeholder="Select your City"
                                                            allowClear
                                                      >
                                                            {
                                                                  cities.map(city => {
                                                                        return <Option
                                                                              value={city}
                                                                              key={city}
                                                                        >{city}
                                                                        </Option>
                                                                  })
                                                            }
                                                      </Select>
                                                </Form.Item>
                                          </div>
                                          <div
                                                className="d-flex"
                                                style={{ textAlignLast: "center" }}>
                                                <Form.Item
                                                      name="date"
                                                      rules={[{
                                                            required: true,
                                                            message: "You missed to pick the Date"
                                                      }]}
                                                      style={{ width: "-webkit-fill-available" }}>
                                                      <DatePicker
                                                            placeholder="Pick your Date"
                                                            format="YYYY/MM/DD"
                                                            style={{ width: "-webkit-fill-available" }} />
                                                </Form.Item>
                                          </div>
                                          <div>
                                                <Button
                                                      type="primary"
                                                      htmlType="submit"
                                                      shape="round"
                                                      style={{ width: "-webkit-fill-available" }}
                                                      icon={<BarChartOutlined />}
                                                >View Data
                                                </Button>
                                          </div>

                                    </Form>
                              </Card>
                        </div>

                  </div>

            </div>
      );
};
export default withRouter(PollutionDataCheck);
