import React from 'react';

import Page from '../components/Page';

import HeaderFooter from '../sections/header-footer';
import IntroText from '../sections/intro-text';
import RecentWork from '../sections/recent-work';
import BioPart1 from '../sections/biography-part-1';
import BioPart2 from '../sections/biography-part-2';
import ListAgencies from '../sections/list-agencies';
import ListAwards from '../sections/list-awards';
import ListClients from '../sections/list-clients';
import ListTech from '../sections/list-tech';
import ProjectsGrid1 from '../sections/projects-grid-1';
// import ProjectsGrid2 from '../sections/projects-grid-2';

import ListProjects from '../sections/list-projects';

export default class Index extends Page{

    constructor( props ){

        super( props );

    }

    render(){

        return (
            <Page>

                <div className="break-7" />
                <IntroText/>

                <HeaderFooter/>

                <div className="break-5"/>
                <ProjectsGrid1/>
                <div className="break-5"/>

                <BioPart1/>
                <div className="break-5"/>
                <ListClients/>
                <div className="break-5"/>
                <ListAgencies/>
                <div className="break-5"/>
                <ListAwards/>                                
                {/* <ProjectsGrid2/> */}
                <div className="break-5"/>
                <BioPart2/>               
                <div className="break-5"/> 
                <ListTech/>
                <HeaderFooter/>
                <div className="break-4"/>

            </Page>
        )

    }
}