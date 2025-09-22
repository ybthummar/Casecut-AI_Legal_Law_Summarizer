"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud, FileText, Bot, Scale, FileCheck2 } from "lucide-react";

// AnimatedLogo component with your provided SVG and a new fill animation
const AnimatedLogo = () => {
  return (
    <>
      <style>{`
        @keyframes fill-in {
          0% {
            fill: transparent;
            stroke: #1f2937;
            stroke-dasharray: 4000;
            stroke-dashoffset: 4000;
          }
          50% {
            fill: transparent;
            stroke: #1f2937;
            stroke-dashoffset: 0;
          }
          100% {
            fill: #1f2937;
            stroke: #1f2937;
            stroke-dashoffset: 0;
          }
        }
        .logo-animate {
          animation: fill-in 3s ease-out forwards;
        }
      `}</style>
      <div className="flex justify-center items-center mb-4">
        {/* Your provided SVG code */}
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="180"
          height="180"
          viewBox="0 0 1024.000000 1024.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
            fill="none"
            stroke="none"
          >
            <path
              className="logo-animate"
              strokeWidth="10"
              d="M4890 8929 c-50 -18 -62 -19 -127 -8 -39 6 -87 9 -106 5 -41 -8 -217 -129 -305 -211 -104 -96 -99 -77 -112 -423 -7 -166 -9 -314 -6 -327 7 -29 -2 -50 -56 -122 -43 -56 -138 -272 -138 -312 0 -32 41 -104 163 -285 l101 -150 -59 -52 c-47 -42 -90 -66 -224 -125 -230 -100 -334 -154 -379 -198 -69 -67 -121 -245 -202 -685 -86 -470 -150 -755 -202 -893 -11 -31 -47 -104 -79 -161 -141 -254 -225 -563 -324 -1197 -19 -126 -40 -253 -46 -282 -9 -48 -40 -103 -58 -103 -4 0 -14 19 -21 43 -19 65 -65 149 -99 181 -56 54 -117 32 -164 -59 -42 -82 -31 -267 24 -407 14 -36 16 -54 9 -74 -13 -33 -13 -89 1 -139 28 -102 138 -283 250 -408 27 -30 49 -58 49 -61 0 -12 -101 -56 -172 -76 -63 -17 -249 -50 -285 -50 -12 0 -93 -122 -93 -140 0 -24 50 -20 121 10 63 27 98 33 258 50 102 10 186 18 186 17 1 -1 25 -96 55 -212 29 -115 67 -261 85 -323 18 -61 32 -112 30 -112 -3 0 -657 375 -788 452 l-117 69 -1 1752 -1 1752 -29 -285 c-16 -157 -52 -514 -79 -793 l-51 -508 -2 -1015 -2 -1016 145 -85 c411 -242 1002 -589 1485 -871 297 -173 691 -404 875 -512 416 -245 394 -234 423 -219 25 14 345 201 1227 719 726 427 1455 854 1588 931 l92 54 0 1055 c-1 946 -2 1074 -19 1240 -10 102 -42 426 -72 720 l-54 534 -5 -1711 c-3 -941 -7 -1713 -10 -1716 -3 -2 -86 -51 -185 -109 -99 -58 -301 -177 -450 -265 -148 -88 -333 -196 -410 -241 l-140 -81 -12 57 c-7 31 -40 215 -73 407 -244 1396 -414 2216 -495 2375 -13 25 -46 79 -74 120 -102 147 -106 82 69 1108 96 560 102 589 133 640 83 138 270 255 467 293 187 35 420 97 668 178 133 43 242 76 242 74 0 -2 -23 -88 -51 -191 -28 -103 -64 -239 -82 -302 -25 -94 -37 -120 -64 -148 -40 -40 -42 -70 -7 -112 35 -41 85 -65 196 -95 296 -80 634 -30 792 115 58 54 59 77 6 122 -36 30 -47 52 -111 218 -135 355 -259 689 -259 700 0 10 145 467 188 594 l17 49 269 114 c149 62 271 113 272 113 1 0 -9 -35 -21 -77 -13 -43 -84 -280 -159 -528 -74 -247 -155 -521 -181 -609 -30 -105 -54 -169 -70 -188 -31 -36 -32 -61 -4 -89 62 -62 182 -84 459 -84 323 1 585 50 621 117 14 25 -9 51 -71 83 l-45 23 -59 164 c-112 314 -378 1034 -407 1102 -35 82 -36 93 -6 107 18 8 27 26 40 81 10 39 16 73 14 74 -2 2 -126 -26 -276 -62 -149 -37 -274 -65 -276 -62 -3 2 26 96 63 209 l67 204 79 40 c88 45 105 68 146 204 27 88 22 102 -59 168 -76 62 -145 94 -210 100 -68 6 -105 -15 -163 -92 -60 -79 -81 -144 -79 -253 l1 -92 -49 -88 c-62 -112 -110 -221 -206 -465 -57 -146 -83 -202 -101 -214 -16 -10 -24 -25 -24 -44 0 -78 -222 -419 -298 -458 -79 -40 -335 -102 -605 -146 -147 -24 -164 -25 -240 -13 -88 14 -440 18 -496 6 -31 -7 -33 -7 -27 15 4 12 9 76 12 142 l6 120 -32 48 c-36 53 -117 125 -238 212 l-79 56 -7 137 c-4 75 -13 150 -21 168 -7 18 -48 70 -90 114 l-76 82 8 82 c4 44 8 151 8 236 0 150 -1 157 -28 213 -51 104 -243 273 -320 282 -18 3 -57 -5 -87 -16z m151 -70 c69 -33 159 -122 194 -192 32 -66 67 -207 63 -249 l-4 -33 -27 55 c-15 30 -27 64 -27 75 -1 39 -40 106 -93 159 -126 126 -335 180 -482 125 -68 -25 -189 -115 -268 -198 -59 -61 -87 -111 -87 -154 0 -33 -20 -87 -32 -87 -6 0 -9 42 -7 114 4 97 7 119 25 143 40 53 292 241 349 260 27 8 88 12 190 10 139 -2 154 -4 206 -28z m3087 -44 c1 -27 -3 -81 -10 -120 l-13 -70 -51 -3 c-36 -2 -57 -9 -69 -22 -10 -11 -22 -20 -27 -20 -14 0 -9 104 8 153 22 65 95 139 132 135 25 -3 27 -7 30 -53z m80 -49 c3 -76 18 -79 28 -6 6 49 23 60 25 17 0 -12 3 -16 6 -9 11 27 23 9 23 -34 0 -49 15 -52 25 -4 l7 31 20 -26 c17 -22 19 -35 14 -73 -7 -52 -42 -131 -61 -138 -7 -3 -34 10 -59 29 -25 20 -61 40 -81 47 -19 6 -35 15 -35 19 0 4 9 34 21 67 12 32 21 85 22 117 0 56 1 57 21 43 17 -11 22 -25 24 -80z m-3327 0 c71 -16 127 -49 204 -119 54 -49 128 -152 94 -131 -8 5 -39 25 -70 46 -74 48 -119 66 -200 79 -134 21 -323 -29 -458 -121 -41 -28 -76 -48 -79 -46 -2 3 9 29 25 58 57 106 177 198 304 232 68 19 110 19 180 2z m144 -182 c39 -18 102 -60 141 -93 80 -67 110 -117 96 -159 -8 -26 -12 -27 -73 -27 -58 0 -76 6 -194 63 -156 75 -200 80 -259 33 -21 -17 -54 -35 -74 -42 -66 -20 -199 -98 -264 -153 -62 -53 -126 -92 -134 -83 -8 8 16 178 30 211 19 47 155 168 233 208 180 94 361 109 498 42z m3122 -9 c45 -19 73 -43 73 -63 0 -12 -10 -14 -52 -9 -29 4 -63 9 -75 13 -28 8 -31 -11 -7 -44 12 -17 25 -22 61 -22 l47 0 -26 -27 c-44 -47 -60 -80 -115 -232 l-54 -146 6 80 c2 44 7 161 11 260 3 99 7 186 9 193 6 17 78 15 122 -3z m-177 -387 c-7 -135 -16 -251 -19 -256 -6 -8 -215 -123 -338 -186 l-52 -26 106 218 c58 119 145 302 195 407 49 104 95 196 101 204 19 22 21 -80 7 -361z m-3115 212 l27 -10 -24 -19 c-23 -19 -23 -20 -5 -50 21 -35 17 -38 -23 -14 -37 21 -72 7 -95 -37 -23 -44 -14 -47 28 -11 19 17 39 31 44 31 5 0 33 -19 63 -41 l55 -41 5 53 c4 41 9 55 23 57 16 3 184 -86 231 -123 17 -13 18 -26 14 -162 -6 -159 -23 -227 -72 -288 l-24 -30 -108 53 c-98 47 -116 52 -175 52 -122 0 -219 -44 -219 -100 0 -86 193 -150 352 -117 l36 8 -18 -48 c-10 -26 -32 -137 -49 -245 -17 -108 -34 -204 -37 -213 -8 -19 -55 -45 -84 -45 -34 0 -72 25 -122 78 -53 57 -88 120 -134 247 -40 108 -45 79 -10 -56 42 -164 95 -257 163 -285 37 -16 130 -18 167 -4 43 16 55 49 86 255 35 225 58 290 129 360 l41 39 0 -29 c0 -17 -25 -181 -55 -365 -41 -254 -51 -336 -42 -342 9 -10 385 -9 472 1 39 5 122 14 185 21 63 6 133 16 155 22 80 21 246 21 422 -1 l168 -21 230 34 c359 54 534 98 634 158 61 37 75 59 148 238 25 63 52 124 60 135 30 45 13 -82 -36 -256 -26 -95 -61 -222 -76 -280 -15 -59 -31 -112 -34 -118 -4 -6 -34 -16 -67 -22 -32 -6 -160 -44 -284 -85 -302 -101 -572 -182 -665 -199 -42 -8 -112 -15 -156 -15 -67 0 -82 3 -100 21 -20 20 -21 29 -16 128 3 58 11 121 16 139 6 20 6 32 0 32 -5 0 -68 -57 -139 -126 -159 -155 -173 -180 -197 -356 -9 -71 -21 -128 -25 -128 -5 0 -50 18 -101 39 -158 68 -367 126 -792 221 l-230 52 -182 183 -183 183 114 116 113 117 6 203 c5 135 3 213 -4 234 -15 43 -8 85 16 97 17 9 19 17 15 65 -6 62 -21 95 -50 110 -32 17 -47 59 -55 151 -10 125 3 150 97 193 40 19 105 46 143 60 39 14 92 44 119 66 51 42 68 47 111 30z m604 -498 c16 -31 9 -138 -12 -178 l-14 -26 -82 89 c-45 48 -93 106 -106 128 -22 37 -23 47 -18 137 l6 98 106 -111 c58 -62 112 -123 120 -137z m-1151 166 c-16 -82 -2 -214 31 -315 22 -67 33 -131 46 -270 10 -100 15 -189 12 -197 -9 -22 -66 -48 -92 -42 -53 13 -223 217 -240 288 -8 31 64 180 149 306 l51 77 0 88 c0 76 3 91 20 103 30 22 33 17 23 -38z m4387 -723 c84 -247 178 -521 209 -608 44 -127 52 -157 38 -153 -47 15 -172 26 -301 26 l-144 0 6 353 c4 193 7 476 8 627 1 257 2 273 16 240 9 -19 84 -237 168 -485z m-214 218 c-6 -153 -16 -431 -22 -618 -6 -187 -12 -341 -14 -343 -1 -1 -45 -7 -96 -13 -52 -5 -127 -16 -167 -25 -41 -9 -76 -14 -78 -11 -3 3 11 56 30 118 85 274 268 887 306 1027 24 84 45 151 47 148 3 -3 0 -130 -6 -283z m-3261 12 c17 -49 34 -95 38 -101 7 -12 232 -156 232 -150 0 3 -16 60 -35 127 -20 68 -34 128 -33 135 4 16 181 -96 269 -171 40 -33 86 -79 102 -103 28 -38 31 -50 30 -110 0 -37 -9 -92 -19 -122 l-19 -55 -40 3 c-63 5 -226 32 -267 44 -27 8 -69 43 -150 125 -157 158 -159 162 -169 341 -5 81 -6 156 -2 167 6 18 7 17 19 -10 7 -16 27 -70 44 -120z m2572 -162 c-48 -142 -91 -258 -96 -258 -10 0 -157 368 -150 375 6 5 315 137 326 139 4 1 -32 -115 -80 -256z m-133 -395 c-11 -29 -27 -61 -36 -70 -14 -15 -160 -55 -169 -45 -2 2 14 107 36 232 22 126 40 243 40 260 0 18 3 35 7 38 4 4 37 -76 75 -178 l68 -185 -21 -52z m81 -100 c90 -235 293 -754 296 -759 2 -4 -13 -3 -34 2 -56 14 -463 22 -572 11 -52 -5 -96 -8 -98 -6 -5 4 99 618 106 626 4 3 47 22 96 42 118 47 128 55 150 115 10 28 19 51 21 51 2 0 18 -37 35 -82z m-3551 -51 c24 -28 108 -120 187 -203 143 -151 143 -151 203 -163 33 -6 218 -51 413 -100 281 -70 385 -101 510 -151 86 -34 164 -67 172 -74 12 -10 12 -35 1 -196 -8 -102 -14 -196 -14 -209 -1 -19 12 -6 61 57 34 45 63 81 64 79 2 -1 -17 -94 -41 -207 -24 -113 -53 -254 -66 -314 -16 -80 -25 -105 -31 -90 -4 10 -30 125 -58 254 -28 129 -56 258 -62 285 l-12 50 -7 -40 c-4 -22 -8 -61 -8 -87 -1 -26 -5 -49 -10 -52 -4 -3 -21 18 -36 47 -15 29 -52 94 -82 145 -64 109 -97 131 -197 132 -90 0 -256 -51 -256 -79 0 -14 127 -158 274 -311 77 -80 170 -176 206 -213 36 -37 56 -64 45 -60 -36 14 -467 239 -585 306 -63 35 -133 74 -155 87 l-40 22 31 -29 c213 -196 570 -481 691 -552 51 -30 91 -56 89 -59 -7 -6 -95 48 -341 208 -121 78 -260 168 -308 199 -49 31 -180 116 -290 189 -221 146 -220 143 7 -70 302 -282 617 -519 841 -631 77 -39 86 -46 65 -51 -28 -6 -253 -30 -429 -46 -156 -14 -161 -12 -274 155 -99 146 -223 348 -309 505 -32 58 -58 98 -58 89 0 -37 52 -413 71 -504 37 -179 64 -219 213 -304 178 -102 438 -199 609 -229 53 -9 97 -20 97 -25 0 -5 -32 -65 -70 -134 -39 -69 -69 -128 -67 -130 2 -1 69 24 150 57 80 33 154 60 165 60 32 0 165 -102 189 -146 20 -37 176 -567 221 -754 19 -78 22 -134 32 -650 5 -311 10 -815 10 -1120 l0 -555 -82 -52 c-46 -28 -108 -63 -138 -78 -30 -15 -104 -59 -163 -97 -91 -59 -337 -188 -358 -188 -4 0 2 30 13 68 46 165 332 1311 382 1532 62 274 110 524 103 543 -2 6 -59 -154 -127 -358 -282 -849 -502 -1434 -670 -1783 -82 -169 -167 -314 -183 -310 -24 6 -217 113 -217 120 0 4 32 60 72 125 221 364 548 947 536 958 -3 3 -597 -883 -689 -1027 -3 -5 -43 11 -90 36 -128 69 -123 63 -104 116 9 25 70 209 136 410 119 364 120 365 218 540 116 205 477 878 679 1266 204 389 396 804 380 820 -3 2 -51 -71 -108 -163 -349 -566 -846 -1305 -1079 -1603 -87 -112 -267 -316 -284 -323 -8 -3 24 56 70 131 82 133 194 314 561 912 409 666 612 1013 599 1026 -5 5 -57 -65 -164 -216 -421 -600 -1270 -1732 -1465 -1955 l-35 -40 -6 115 c-14 256 -19 932 -8 1150 11 225 37 530 47 562 4 14 11 11 36 -20 62 -73 184 -195 240 -238 139 -109 255 -128 383 -64 38 19 105 60 147 90 88 63 258 209 258 221 0 5 -28 -8 -61 -28 -241 -141 -442 -186 -567 -128 -63 29 -154 113 -227 210 -65 87 -165 251 -165 271 0 8 29 89 65 179 36 90 65 168 65 174 0 24 18 7 75 -72 89 -121 243 -313 311 -386 62 -67 201 -191 215 -191 4 0 -44 66 -107 147 -134 171 -282 389 -324 478 -37 78 -62 174 -58 222 3 35 9 27 132 -173 172 -279 319 -484 347 -484 4 0 -21 84 -58 188 -245 699 -546 1642 -530 1658 2 3 21 -35 42 -83 135 -320 332 -603 479 -692 31 -19 58 -32 60 -30 2 2 -45 90 -105 194 -61 105 -171 312 -246 462 -124 249 -136 279 -146 352 l-10 79 51 58 c101 118 162 252 162 361 0 61 -27 169 -114 450 -36 116 -66 214 -66 217 0 3 8 6 18 6 9 0 37 -24 61 -53z m-75 -122 c71 -259 126 -501 128 -556 1 -51 -3 -65 -42 -130 -53 -90 -238 -367 -250 -374 -28 -18 -19 326 16 597 9 66 14 122 12 124 -8 7 -91 -147 -115 -214 -24 -66 -124 -467 -158 -632 -13 -64 -40 -133 -110 -280 -105 -221 -184 -412 -221 -538 -20 -68 -27 -114 -29 -212 -5 -189 -20 -242 -213 -755 l-136 -360 -7 -120 c-9 -132 -29 -241 -53 -277 -9 -13 -45 -48 -80 -77 -36 -30 -78 -70 -94 -90 -35 -44 -82 -134 -82 -157 0 -57 -115 143 -146 253 -23 85 -14 123 45 187 27 28 70 85 96 126 26 41 63 93 81 116 50 61 61 95 94 301 16 103 42 260 56 348 61 379 98 514 211 765 36 80 81 179 99 221 55 124 217 753 259 1007 42 256 76 413 116 537 31 97 51 123 139 182 105 70 331 169 341 150 4 -7 23 -70 43 -142z m3279 3 c-2 -13 -24 -148 -48 -301 -24 -154 -45 -281 -48 -283 -11 -12 -107 -30 -107 -21 0 6 39 149 87 319 70 248 90 308 103 308 12 0 16 -6 13 -22z m1317 -208 c181 -16 225 -35 185 -80 -64 -71 -342 -98 -560 -54 -90 18 -177 60 -173 83 10 49 279 74 548 51z m-840 -416 c172 -19 193 -26 188 -57 -4 -32 -81 -79 -184 -113 -75 -25 -105 -29 -194 -29 -102 0 -107 1 -181 39 -103 52 -169 109 -169 146 0 21 6 30 23 34 42 9 373 -3 517 -20z m-3895 -749 c56 -265 95 -508 95 -591 0 -113 -60 -370 -165 -709 -69 -222 -73 -239 -100 -444 -78 -598 -162 -1616 -172 -2087 l-6 -281 -56 31 c-31 18 -102 59 -157 91 l-102 59 -27 111 c-87 358 -195 833 -193 849 2 11 19 29 38 40 30 18 59 22 195 26 158 6 210 17 230 50 13 21 -6 61 -38 80 -43 27 -84 25 -127 -5 -21 -15 -62 -30 -96 -35 -62 -10 -334 -14 -334 -5 0 4 7 19 15 35 30 59 56 277 75 630 l9 186 70 144 c95 200 308 682 332 754 15 42 23 103 28 211 7 121 12 158 29 191 11 22 55 118 97 214 147 334 305 643 321 627 2 -2 20 -79 39 -172z m-1362 -1822 c29 -31 53 -83 72 -155 12 -45 12 -50 -12 -84 -30 -46 -106 -134 -114 -134 -3 0 -19 42 -35 93 -39 125 -41 242 -5 281 31 33 61 33 94 -1z m272 -833 c22 -44 35 -84 35 -109 0 -38 -2 -40 -47 -55 -98 -34 -118 -16 -111 101 4 64 9 78 33 103 16 17 35 30 42 30 7 0 29 -31 48 -70z m133 -324 c2 -3 49 -179 103 -393 55 -213 108 -418 119 -455 10 -38 15 -68 11 -68 -4 0 -27 13 -52 29 l-46 28 -27 119 c-16 66 -63 259 -106 429 -42 171 -75 314 -72 319 4 7 60 1 70 -8z m9 -423 c60 -230 108 -420 107 -422 -2 -2 -27 10 -56 26 l-53 30 -87 344 c-48 189 -87 357 -87 373 -1 33 24 66 49 66 14 0 37 -77 127 -417z"
            />
            <path
              d="M4732 8530 c-43 -19 -215 -150 -208 -158 7 -6 47 17 117 69 37 27 83 56 102 64 47 20 121 19 181 -1 53 -18 68 -14 34 8 -65 42 -157 49 -226 18z"
            />
            <path
              d="M5010 8405 c0 -11 84 -45 110 -44 18 0 12 5 -25 20 -70 27 -85 31 -85 24z"
            />
            <path
              d="M4735 8083 c-52 -13 -33 -23 35 -17 44 4 91 2 114 -4 37 -11 39 -10 23 5 -17 18 -128 28 -172 16z"
            />
            <path
              d="M4795 8030 c-16 -7 -17 -9 -3 -9 9 -1 20 4 23 9 7 11 7 11 -20 0z"
            />
          </g>
        </svg>
      </div>
    </>
  );
};

const LegalSummarizer = () => {
  const [file, setFile] = useState(null);
  const [abstractiveModel, setAbstractiveModel] = useState("t5");
  const [extractiveSummary, setExtractiveSummary] = useState("");
  const [abstractiveSummary, setAbstractiveSummary] = useState("");
  const [ipcSections, setIpcSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    setExtractiveSummary("");
    setAbstractiveSummary("");
    setIpcSections([]);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("abstractive_model", abstractiveModel);

    try {
      const res = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
      const data = await res.json();
      setExtractiveSummary(data.extractive);
      setAbstractiveSummary(data.abstractive);
      setIpcSections(data.ipc_sections);
    } catch (err) {
      console.error("Error uploading file:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <section className="min-h-screen bg-gray-50/50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <AnimatedLogo />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              AI Legal Document Summarizer
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Upload a legal PDF to receive a concise extractive summary, a fluent abstractive summary, and a list of detected IPC sections.
            </p>
          </div>

          <Card className="bg-white shadow-lg rounded-xl border animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-2">
                  <Label htmlFor="pdf-upload" className="font-semibold">Upload Legal Case (PDF)</Label>
                  <div
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragOver ? 'border-violet-600 bg-violet-50' : 'border-gray-300 bg-white'}`}
                  >
                    <input
                      id="pdf-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {file ? (
                      <div className="text-green-600 flex flex-col items-center justify-center">
                        <FileCheck2 className="h-10 w-10 mb-2" />
                        <p className="font-semibold text-sm truncate w-full px-2">{file.name}</p>
                        <p className="text-sm text-gray-500">File selected successfully!</p>
                      </div>
                    ) : (
                      <div className="text-gray-500 flex flex-col items-center justify-center">
                        <UploadCloud className="h-10 w-10 mb-2" />
                        <p className="font-semibold">Drag & drop your PDF here</p>
                        <p className="text-sm">or click to select a file</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model-select" className="font-semibold">Select Abstractive Model</Label>
                  <Select value={abstractiveModel} onValueChange={setAbstractiveModel}>
                    <SelectTrigger id="model-select" className="w-full">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t5">T5 (Balanced)</SelectItem>
                      <SelectItem value="pegasus">Pegasus (Google)</SelectItem>
                      <SelectItem value="led">LED (Long-form)</SelectItem>
                      <SelectItem value="bart">SBERT (General)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button
                  className="px-8 py-3 text-md font-semibold bg-gray-800 hover:bg-gray-900"
                  onClick={handleUpload}
                  disabled={!file || isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="mr-2 h-5 w-5" />
                      Upload & Summarize
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {(extractiveSummary || abstractiveSummary || isLoading) && (
            <div className="grid lg:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Card className="bg-white shadow-md border">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <FileText className="mr-3 h-6 w-6 text-blue-600" />
                    Extractive Summary (SBERT)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea value={isLoading ? "Generating..." : extractiveSummary} readOnly rows={12} className="resize-none bg-gray-50/70" />
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md border">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Bot className="mr-3 h-6 w-6 text-purple-600" />
                    Abstractive Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea value={isLoading ? "Generating..." : abstractiveSummary} readOnly rows={12} className="resize-none bg-gray-50/70" />
                </CardContent>
              </Card>
            </div>
          )}

          {(ipcSections.length > 0 || (isLoading && !extractiveSummary)) && (
            <Card className="bg-white shadow-md border animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Scale className="mr-3 h-6 w-6 text-red-600" />
                  Detected IPC Sections
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && ipcSections.length === 0 ? (
                  <p className="text-muted-foreground italic">Detecting sections...</p>
                ) : ipcSections.length > 0 ? (
                  <ul className="space-y-3">
                    {ipcSections.map((ipc, idx) => (
                      <li key={idx} className="p-3 bg-gray-50 rounded-lg border">
                        <strong className="text-gray-800">{ipc.section}</strong>: {ipc.title}
                        <p className="text-sm text-muted-foreground mt-1">
                          <strong>Punishment:</strong> {ipc.punishment}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">No IPC sections found.</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </>
  );
};

export default LegalSummarizer;
