import React from 'react';
import ReactHtmlParser from 'react-html-parser'; 
import Linkify from 'react-linkify';

const Mails = () => {
    var mail = "<b>Name</b><br><h1>New Title</h1> www.google.com saksham@gami.com <br>"
  return (
    <>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
        <Linkify> { ReactHtmlParser(mail) } </Linkify>
    </>
    

  );
};

export default Mails;
