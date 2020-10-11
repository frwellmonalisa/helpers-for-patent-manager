import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AlienationContractCalc from "./components/AlienationContractCalc";
import { Container } from "react-bootstrap";
import ComputerProgramRegCalc from "./components/ComputerProgramRegCalc";
import AlterationCalc from "./components/AlterationCalc";
import ExpertiseCalc from "./components/ExpertiseCalc";
import FIPSRegisters from "./components/FIPSRegisters";
import OrgSearch from "./components/OrgSearch";

const App = () => {
    return (
        <Container>
            <h1 className="text-center">Инструменты патентного поверенного</h1>
            <Tabs>
                <TabList>
                    <Tab>Основной</Tab>
                    <Tab>Другой</Tab>
                    <Tab>Реестры ФИПС</Tab>
                    <Tab>Поиск организаций и ИП</Tab>
                </TabList>

                <TabPanel>
                    <ExpertiseCalc />
                </TabPanel>
                <TabPanel>
                    <AlienationContractCalc />
                    <hr />
                    <ComputerProgramRegCalc />
                    <hr />
                    <AlterationCalc />
                    <hr />
                </TabPanel>
                <TabPanel>
                    <FIPSRegisters />
                </TabPanel>
                <TabPanel>
                    <OrgSearch />
                </TabPanel>
            </Tabs>
        </Container>
    );
};

export default App;
