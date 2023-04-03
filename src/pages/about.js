import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout title="About" description="About page">
      <div class="container margin-vert--lg">
        <div class="row">
          <div class="col col--1"/>
          <div class="col col--2">
            <img src="https://github.com/lorenzo-arena.png" style={{borderRadius: '50%'}}/>
          </div>
          <div class="col col--8">
            <h2>Hi!</h2>
            <p>I'm Lorenzo Arena, a software engineer from Italy; I mainly work with embedded systems based on Linux.
            In my free time, I also like to develop videogames and play boardgames, or go on a hike.</p>
            <p>If you want to contact me, just send me an email (the address is on my GitHub page).</p>
            <h4>Closing The Loop?</h4>
            <p><em>Which loop?</em> You may be asking. I came up with this name for my blog since it's my attempt
            to share the things I learn or find useful back with the community.</p>
          </div>
          <div class="col col--1"/>
        </div>
      </div>
    </Layout>
  );
}