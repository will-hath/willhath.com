"use client"
import React from 'react';
import { useEffect, useRef } from 'react';
import TVGrid from '@/components/TVGrid/TVGrid';
import './home.css';
import { TVProps } from "@/types/types";
import TV from '@/components/TV/TV';
import Desk from '@/components/Desk/Desk';
import Image from 'next/image';

const Tidbits: TVProps = {
  imageSources: ["/assets/chalkboard.jpg"],
  textSources: [
    "The original DTP (Diptheria, Tetanus, Pertussis) vaccine, was considered too dangerous for use in the USA in the late 1980s due to neurological side-effects, and was replaced by DTaP, which uses acellular components of Pertussis, rather than whole-cell. However, DTP is still widely used in developing countries.",
    "There's a narrative in the USA that we have an obscene amount of national debt. But, if you compare our debt to GDP ratio to the rest of the world's 8 largest economies (China, UK, Italy, Japan, Germany, France, UK, India), ours is better than 2 of them, and is comparable to another 2.",
    "Jensen Huang went to Oregon State University.",
    "The non-profit that runs Signal is so blind to user data that they don't even know *how many users they have*.",
    "Pathao, a Nepalese ride-sharing app, doesn't even try and algorithmically generate a ride fee. Instead, it's a fully free market, with riders proposing a payment for a ride, and drivers being free to accept any bids. This was likely just done because it's easier to implement, but an interesting benefit is that Pathao avoids negative PR from accusations of \"price gauging\" during peak times.",
    "The reason the worlds second tallest mountain, K2, is named what it is, rather than some real name (Like Lhotse, Everest (aka Sagarmatar), Cho Oyu, Manaslu, etc) is that the locals didn't know that it existed! It wasn't visible from anywhere anyone would ever want to go. This is not true of any other mountains in the top 20.",
    "If you use an email marketing service like Mailchimp, they're able to give you information on which people opened your email. The way they do this is by embedding a unique, tiny image address in each email, which your email client then tries to load when it renders the email. Mailchimp detects which image addresses got GET requests, and uses that to track who opened which emails.",
    "In Oregon, in order to offset lost gas tax revenue, it costs more than twice as much to register an electric vehicle with the DMV than a gas-powered vehicle. There's also a penalty for vehicles that get better gas mileage.",
    "The stability of consumer gasoline has deteriorated significantly since the 1980s, from ~9 months to ~2 months. This is largely due to the introduction of ethanol(modern gasoline contains ~10%), which absorbs water from the atmosphere over time, causing fuel to become less stable/efficient. Ethanol is introduced because it causes less greenhouse gas emissions, and it is able to be manufactured from agricultural products (corn, sugarcane, etc) rather than drilled for like oil.",
    "*San Francisco (Be Sure to Wear Some Flowers in your Hair)*, by Scott McKenzie, was the anthem of the summer of love, and actually drove a bunch of people to come to San Francisco (rather than the correlation going the other way as I'd assumed)",
    "Trumpets seem complicated to play. There are two ways to alter the pitch -- with your mouth, and with the valves. Your mouth gives most of the range, but because of how tubes work, you're only able to hit the harmonics, which decrease in spacing as they increase. So, for a \"C\" trumpet, you can (in order) play a low C, a middle C, a middle G, a high C, a high E, a high A flat, etc. If you want to hit the notes in between, you have to use the valves, which you control with your fingers. The effectively change the length of the trumpet tube by a fixed amount, which each correspond to a fixed decrease in pitch -- a half tone, a whole tone, or a minor third. By pressing them in combination, you can hit 8 (2^3) unique notes for each harmonic.",
    "If the moon lost all it's momentum (relative to the earth), it would take about two weeks until it crashed into us.",
    "When estimating the net worth of individuals, Forbes values stock held in private companies at 90 cents on the dollar. So if you're a founder who owns 10% of a company that's worth 10 billion, you're \"worth\" 900 million.",
    "OpenAI's model spec has nothing explicitly against racism, other than to encourage kindness and fairness while discouraging hate.",
    "Guinness world records is the same Guinness as Guinness beer. In order to write the first ever book, they reached out to experts in various fields. Instead of asking them for direct pieces of information, they stated facts that felt right, and experts eagerly stepped in to correct them.",
    "The British Library has super tight security. You can't bring your bag into any book rooms, and have to transfer anything you want to bring with you into transparent plastic bags that the library provides.",
    "Intel is the only player in the chip industry that both designs *and* manufactures their chips.",
    "For any three variables x,y,z that are all functions of eachother (∂x/∂y)z (∂y/∂z)x (∂z/∂x)y = -1",
    "The first primary use of Galileo's discovery of the jovian moons was to redraw all of our maps! Since the Jovian eclipses happen very frequently, you can compare your local time to your global time (based off when the eclipse happened).",
    "Apparently MIT offers it's students an interest free 5000 dollar loan. If every freshman at MIT took it out and put it into treasury bonds, they could get a free 1000 dollars when they graduate.",
    "You can automatically switch the image type of an image on mac by going \"right click->quick actions-convert image\" in finder.",
    "You can add /students to the url in canvas to see everyone that's registered for a class.",
    "Aluminum is much harder to weld than steel, primarily because it conducts heat faster, and has a lower melting point. This gives you a smaller \"window of workability\".",
    "New Hampshire is the only US state to have no laws requiring adults to wear seatbelts. However, in many other states (such as Massachusetts), it's a \"secondary offense\", which means you can't get pulled over for not wearing one, but if you get pulled over for a primary infraction, you can get cited for not wearing a seatbelt.",
    "The tallest oil platform is 2100 ft tall! It's called the Petronius Compliant tower, and is in the Gulf of Mexico. Most of it is under water though.",
    "If clench my face really hard (kindof like I'm pooping), and wiggle my jaw, it works much better to clear my ears when I'm diving.",
    "There's this restaurant called Bali in Curacao that's not worth going to.",
    "If you don't check in to your international flight more than 45 minutes before it leaves, they won't let you on. On the upside, they can usually reschedule you for free.",
    "The front seat of a Uhaul cabin can fit 5 people if you really try.",
    "The building manager of The Stud (student center at MIT) is named Tim Woods and he can be pretty reasonable once you get to know him.",
    "If you have a vertical plank of wood holding back water (ie, in a rectangular tank), the center of torque is at 1/3 the height of the water.",
    "In economics, there's this thing called the \"productivity J curve\", where basically, after a new technology is discovered, \"productivity\" (as measured via GDP) will stagnate, because free capitol is being invested into the new technology (ie, building railroad lines, integrating AI infrastructure, etc). But then, once these shorter-term investments pay off, GPD rises faster again, overcoming the rate of decreased productivity.",
    "There are two styles of cross country skiing. There's \"Classic\", where you mostly keep your skis parallel to each other, and mainly use your arms. Then there's \"Skating\", where you point your toes outwards and drive yourself forwards by pushing your legs outwards. Classic is more intuitive, but generally requires better packed/more consistent snow.",
    "Apparently Oxford has a secret \"night climbers\" club where people climb the walls + towers + roofs around Oxford. It seems to have a bigger focus on athleticism.",
    "The Estonian flag looks like the average landscape in Estonia: White snow, black trees, blue sky. Look it up, you'll see what I mean!",
    "The ideal strategy in Ticket to Ride is probably to hoard cards at the beginning of the game (higher locomotives/card average, and you preserve optionality as long as possible). Also, start with game with fairly few tickets, and make sure they all can be linked together. People usually undervalue the utility of just building lots of roads and going out of trains. Also, in the EU version, Palermo to Moscow is the best long-route since that part of the board is much less crowded.",
    "Apparently most countries other than the US have interest free investment accounts with **no** restrictions on what they can be used for (Canada has TFSA, UK has ISA). The limits are higher or comparable to in the US. The US has Roth IRA, but that has super strict limits on how you can withdraw from it, usually is just for retirement savings.",
    "Estonia, Finland, and maybe a few other countries are all in the same free-market energy pricing scheme. Due to extremely cold temperatures as well as less supply (I assume Russia/Ukraine stuff), energy prices are now such that running a small space heater for one day would cost ~€150. God bless America, and her oil."
  ],
  name: "",
  href: "/tidbits/"
}

const Substack: TVProps = {
  imageSources: ["/assets/substack.png"],
  name: "substack",
  href: "https://willhath.substack.com"
}

const Projects: TVProps = {
  imageSources: ["/assets/comingsoon.png"],
  name: "projects",
  href: "/projects/"
}

const Bookshelf: TVProps = {
  imageSources: ["/assets/comingsoon.png"],
  name: "bookshelf",
  href: "/bookshelf/"
}

const Quotes: TVProps = {
  imageSources: ["/assets/comingsoon.png"],
  textSources: ["“Where there's Will there hath to be away”", "“Alone, at the end of a universe humming a tune”", "“The whole idea that when you fall you gotta get up is bullshit. The whole thing is a fall. A perpetual state of grasping in the dark. It's not about getting up, it's about stumbling in the right direction. It's the only true way to move forward.”", "“It gets easier. Every day it gets a little easier. But you gotta do it every day —that's the hard part. But it does get easier”", "“The universe is a cruel, uncaring void. The key to being happy isn't a search for meaning. It's to just keep yourself busy with unimportant nonsense, and eventually, you'll be dead.”", "“There's a star man, waiting in the sky\nHe'd like to come and meet us but he thinks he'd blow our minds”", "“My God, a whole moment of happiness! Is that too little for the whole of a man's life?”", "“there is no name you could call me would make me value your approval”", "“There are no endings, and never will be endings, to the turning of the Wheel.\nBut it was an ending”", "“blessed be the peacemakers, for they will be shot at from two sides”", "“there was truth and there was untruth, and if you clung to the truth, even against the whole world, you were not mad.”", "“If people do not believe that mathematics is simple, it is only because they do not realize how complicated life is.”", "“Fling yourself straight into life, without deliberation; don't be afraid - the flood will bear you back to the bank and set you safe on your feet again”", "“above all, don't lie to yourself.”", "“Quite simple.\nBe an example of humanity that is not disappointing”", "“We take risks, we know we take them.\nTherefore, when things come out against us, we have no cause for complaint.”", "“Everyone remembers icarus, nobody remembers the other guy”"],
  name: "",
  href: "/quotes/"
}

const LeftGroundTV: TVProps = {
  imageSources: ["/assets/spruce.gif"],
  name: "Spruce",
  href: "https://spruce.world/",
  hasAntennas: true
}

const RightGroundTV: TVProps = {
  imageSources: ["/assets/atticus.gif"],
  name: "Atticus",
  href: "https://chry-santhemum.github.io/website/",
  hasAntennas: true
}


export default function Home() {
  const mainContainerRef = useRef<HTMLElement>(null);

  const tvContents: (TVProps | null)[] = [
    null, null, Bookshelf, Substack, Quotes, null, null,
    null, null, null, Tidbits, null, null, null,
    null, null, Projects, null, null, null, null
  ];

  useEffect(() => {
    // Run this effect after the component mounts in the browser
    if (mainContainerRef.current) {
      const { scrollWidth, clientWidth } = mainContainerRef.current;
      if (scrollWidth > clientWidth) {
        const midpoint = (scrollWidth - clientWidth) / 2;
        mainContainerRef.current.scrollLeft = midpoint;
      }
    }
  }, []);

  return (
    <main className="main-container" ref={mainContainerRef}>
      <div className="content-wrapper">
        <div className="grid-container">
          <TVGrid 
            rows={3} 
            columns={7}
            tvContents={tvContents} />
        </div>
        <div className="foreground">
          <Desk></Desk>
          <div className="ground-tvs">
            <div className="ground-tv">
              <TV {...LeftGroundTV} />
            </div>
            <div className="ground-tv">
              <TV {...RightGroundTV} />
            </div>
          </div>
          <Image 
            src="/assets/man_from_behind.png"
            alt="Viewer"
            className="viewer-image"
            width={500}
            height={800}
            priority
          />
            <div className="nameplate-container">
              <a href="/about/">
                <Image
                  src="/assets/nameplate.png"
                  alt="Nameplate"
                  className="nameplate"
                  width={300}
                  height={60}
                  priority
                />
              </a>
            </div>
        </div>
      </div>
    </main>
  );
}
