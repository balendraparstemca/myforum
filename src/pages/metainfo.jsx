import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';

class MetaTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            metainfo: null,
            canonicalURL: ''
        }


    }

    description = null;

    componentDidMount() {
        this.setState({
            metainfo: this.props.metaTag ? this.props.metaTag : null
        })
    }
    render() {
        
        return (<>
            <div>{
                this.state.metainfo ? (<Helmet>
                    <meta property="og:locale" content="en_US"></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta property="og:site_name" content='Casual desi' />
                    {this.state.metainfo.title ? <title>{this.state.metainfo.title}</title> : ''}
                    {this.state.metainfo.title ? <meta property="og:title" content={this.state.metainfo.title}></meta> : ''}
                    {this.state.metainfo.title ? <meta property="twitter:title" content={this.state.metainfo.title}></meta> : ''}

                    { this.state.metainfo.meta ? this.state.metainfo.meta.map((metaTag, i) => {
                        const type = metaTag.attribute;
                        const typeCon = metaTag.value;
                        const desc = metaTag.content;
                        const metaAttr = {
                            [type]: typeCon, content: desc,
                        };
                        if (type === 'name' && typeCon === 'description') {
                            this.description = desc
                        }
                        return <meta key={i} {...metaAttr} />
                    }) : ''}
                    {this.description ? <meta property="og:description" content={this.description}></meta> : ''}
                    {this.description ? <meta property="twitter:description" content={this.description}></meta> : ''}
                    {this.state.metainfo.canonicalURL ? <meta property="og:url" content={this.state.metainfo.canonicalURL} /> : ''}
                    {this.state.metainfo.canonicalURL ? <meta property="twitter:url" content={this.state.metainfo.canonicalURL} /> : ''}
                    {this.state.metainfo.ldSchema ? <script type="application/ld+json">{this.ldSchema}</script> : ''}
                </Helmet>) : ''
            } </div>
        </>)
    }
}

export default MetaTag