// ── Creature frames ──────────────────────────────────────────────────────────
import sleepyCat1 from "@/assets/sprites/sleepy-cat-frame1.png";
import sleepyCat2 from "@/assets/sprites/sleepy-cat-frame2.png";
import sleepyCat3 from "@/assets/sprites/sleepy-cat-frame3.png";
import sleepyCat4 from "@/assets/sprites/sleepy-cat-frame4.png";

import birdcage1 from "@/assets/sprites/birdcage-frame1.png";
import birdcage2 from "@/assets/sprites/birdcage-frame2.png";
import birdcage3 from "@/assets/sprites/birdcage-frame3.png";
import birdcage4 from "@/assets/sprites/birdcage-frame4.png";

import owl1 from "@/assets/sprites/owl-on-books-frame1.png";
import owl2 from "@/assets/sprites/owl-on-books-frame2.png";
import owl3 from "@/assets/sprites/owl-on-books-frame3.png";
import owl4 from "@/assets/sprites/owl-on-books-frame4.png";

import goldfish1 from "@/assets/sprites/goldfish-bowl-frame1.png";
import goldfish2 from "@/assets/sprites/goldfish-bowl-frame2.png";
import goldfish3 from "@/assets/sprites/goldfish-bowl-frame3.png";
import goldfish4 from "@/assets/sprites/goldfish-bowl-frame4.png";

import firefly1 from "@/assets/sprites/firefly-jar-frame1.png";
import firefly2 from "@/assets/sprites/firefly-jar-frame2.png";
import firefly3 from "@/assets/sprites/firefly-jar-frame3.png";
import firefly4 from "@/assets/sprites/firefly-jar-frame4.png";

// ── Cozy item frames ─────────────────────────────────────────────────────────
import lava1 from "@/assets/sprites/lava-lamp-frame1.png";
import lava2 from "@/assets/sprites/lava-lamp-frame2.png";
import lava3 from "@/assets/sprites/lava-lamp-frame3.png";
import lava4 from "@/assets/sprites/lava-lamp-frame4.png";

import recipe1 from "@/assets/sprites/floating-recipe-frame1.png";
import recipe2 from "@/assets/sprites/floating-recipe-frame2.png";
import recipe3 from "@/assets/sprites/floating-recipe-frame3.png";
import recipe4 from "@/assets/sprites/floating-recipe-frame4.png";

import tea1 from "@/assets/sprites/tea-cup-frame1.png";
import tea2 from "@/assets/sprites/tea-cup-frame2.png";
import tea3 from "@/assets/sprites/tea-cup-frame3.png";
import tea4 from "@/assets/sprites/tea-cup-frame4.png";

import snow1 from "@/assets/sprites/snow-globe-frame1.png";
import snow2 from "@/assets/sprites/snow-globe-frame2.png";
import snow3 from "@/assets/sprites/snow-globe-frame3.png";
import snow4 from "@/assets/sprites/snow-globe-frame4.png";

import candle1 from "@/assets/sprites/candelabra-frame1.png";
import candle2 from "@/assets/sprites/candelabra-frame2.png";
import candle3 from "@/assets/sprites/candelabra-frame3.png";
import candle4 from "@/assets/sprites/candelabra-frame4.png";

// ── Plant frames ─────────────────────────────────────────────────────────────
import terra1 from "@/assets/sprites/terrarium-frame1.png";
import terra2 from "@/assets/sprites/terrarium-frame2.png";
import terra3 from "@/assets/sprites/terrarium-frame3.png";
import terra4 from "@/assets/sprites/terrarium-frame4.png";

import mush1 from "@/assets/sprites/mushroom-cluster-frame1.png";
import mush2 from "@/assets/sprites/mushroom-cluster-frame2.png";
import mush3 from "@/assets/sprites/mushroom-cluster-frame3.png";
import mush4 from "@/assets/sprites/mushroom-cluster-frame4.png";

import succ1 from "@/assets/sprites/succulent-fairy-frame1.png";
import succ2 from "@/assets/sprites/succulent-fairy-frame2.png";
import succ3 from "@/assets/sprites/succulent-fairy-frame3.png";
import succ4 from "@/assets/sprites/succulent-fairy-frame4.png";

import vine1 from "@/assets/sprites/vine-in-bottle-frame1.png";
import vine2 from "@/assets/sprites/vine-in-bottle-frame2.png";
import vine3 from "@/assets/sprites/vine-in-bottle-frame3.png";
import vine4 from "@/assets/sprites/vine-in-bottle-frame4.png";

// ── Magical frames ───────────────────────────────────────────────────────────
import crystal1 from "@/assets/sprites/crystal-ball-frame1.png";
import crystal2 from "@/assets/sprites/crystal-ball-frame2.png";
import crystal3 from "@/assets/sprites/crystal-ball-frame3.png";
import crystal4 from "@/assets/sprites/crystal-ball-frame4.png";

import spell1 from "@/assets/sprites/spell-book-frame1.png";
import spell2 from "@/assets/sprites/spell-book-frame2.png";
import spell3 from "@/assets/sprites/spell-book-frame3.png";
import spell4 from "@/assets/sprites/spell-book-frame4.png";

import music1 from "@/assets/sprites/music-box-frame1.png";
import music2 from "@/assets/sprites/music-box-frame2.png";
import music3 from "@/assets/sprites/music-box-frame3.png";
import music4 from "@/assets/sprites/music-box-frame4.png";

import hour1 from "@/assets/sprites/hourglass-frame1.png";
import hour2 from "@/assets/sprites/hourglass-frame2.png";
import hour3 from "@/assets/sprites/hourglass-frame3.png";
import hour4 from "@/assets/sprites/hourglass-frame4.png";

import quill1 from "@/assets/sprites/self-writing-quill-frame1.png";
import quill2 from "@/assets/sprites/self-writing-quill-frame2.png";
import quill3 from "@/assets/sprites/self-writing-quill-frame3.png";
import quill4 from "@/assets/sprites/self-writing-quill-frame4.png";

import cauldron1 from "@/assets/sprites/mini-cauldron-frame1.png";
import cauldron2 from "@/assets/sprites/mini-cauldron-frame2.png";
import cauldron3 from "@/assets/sprites/mini-cauldron-frame3.png";
import cauldron4 from "@/assets/sprites/mini-cauldron-frame4.png";

export type DecorationCategory = "creature" | "item" | "plant" | "magical";

export interface DecorationDescriptor {
  id: string;
  type: DecorationCategory;
  label: string;
  frames: string[];
  frameDuration: number;
  idleAnimation: string;
  defaultScale: number;
}

export const categoryLabels: Record<DecorationCategory, string> = {
  creature: "\u{1F43E}",
  item: "\u2615",
  plant: "\u{1F33F}",
  magical: "\u2728",
};

export const categoryOrder: DecorationCategory[] = [
  "creature",
  "item",
  "plant",
  "magical",
];

export const decorationDescriptors: DecorationDescriptor[] = [
  // ── Creatures ──────────────────────────────────────────────────────────────
  {
    id: "sleepy-cat",
    type: "creature",
    label: "Sleepy Cat",
    frames: [sleepyCat1, sleepyCat2, sleepyCat3, sleepyCat4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "birdcage",
    type: "creature",
    label: "Birdcage",
    frames: [birdcage1, birdcage2, birdcage3, birdcage4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "owl-on-books",
    type: "creature",
    label: "Owl on Books",
    frames: [owl1, owl2, owl3, owl4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "goldfish-bowl",
    type: "creature",
    label: "Goldfish Bowl",
    frames: [goldfish1, goldfish2, goldfish3, goldfish4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "firefly-jar",
    type: "creature",
    label: "Firefly Jar",
    frames: [firefly1, firefly2, firefly3, firefly4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },

  // ── Cozy Items ─────────────────────────────────────────────────────────────
  {
    id: "lava-lamp",
    type: "item",
    label: "Lava Lamp",
    frames: [lava1, lava2, lava3, lava4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "floating-recipe",
    type: "item",
    label: "Floating Recipe",
    frames: [recipe1, recipe2, recipe3, recipe4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "tea-cup",
    type: "item",
    label: "Tea Cup",
    frames: [tea1, tea2, tea3, tea4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "snow-globe",
    type: "item",
    label: "Snow Globe",
    frames: [snow1, snow2, snow3, snow4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "candelabra",
    type: "item",
    label: "Candelabra",
    frames: [candle1, candle2, candle3, candle4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },

  // ── Plants ─────────────────────────────────────────────────────────────────
  {
    id: "terrarium",
    type: "plant",
    label: "Terrarium",
    frames: [terra1, terra2, terra3, terra4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "mushroom-cluster",
    type: "plant",
    label: "Mushroom Cluster",
    frames: [mush1, mush2, mush3, mush4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "succulent-fairy",
    type: "plant",
    label: "Succulent & Fairy",
    frames: [succ1, succ2, succ3, succ4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "vine-in-bottle",
    type: "plant",
    label: "Vine in Bottle",
    frames: [vine1, vine2, vine3, vine4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },

  // ── Magical ────────────────────────────────────────────────────────────────
  {
    id: "crystal-ball",
    type: "magical",
    label: "Crystal Ball",
    frames: [crystal1, crystal2, crystal3, crystal4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "spell-book",
    type: "magical",
    label: "Spell Book",
    frames: [spell1, spell2, spell3, spell4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "music-box",
    type: "magical",
    label: "Music Box",
    frames: [music1, music2, music3, music4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "hourglass",
    type: "magical",
    label: "Hourglass",
    frames: [hour1, hour2, hour3, hour4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "self-writing-quill",
    type: "magical",
    label: "Self-Writing Quill",
    frames: [quill1, quill2, quill3, quill4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
  {
    id: "mini-cauldron",
    type: "magical",
    label: "Mini Cauldron",
    frames: [cauldron1, cauldron2, cauldron3, cauldron4],
    frameDuration: 300,
    idleAnimation: "none",
    defaultScale: 1,
  },
];

export function getDecorationDescriptor(
  id: string
): DecorationDescriptor | undefined {
  return decorationDescriptors.find((d) => d.id === id);
}
