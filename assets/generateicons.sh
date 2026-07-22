#!/bin/bash

convert icon.png \
    \( -clone 0 -resize 128x128 -write ../icons/icon-128x128.png \) \
    \( -clone 0 -resize 144x144 -write ../icons/icon-144x144.png \) \
    \( -clone 0 -resize 152x152 -write ../icons/icon-152x152.png \) \
    \( -clone 0 -resize 192x192 -write ../icons/icon-192x192.png \) \
    \( -clone 0 -resize 384x384 -write ../icons/icon-384x384.png \) \
    \( -clone 0 -resize 512x512 -write ../icons/icon-512x512.png \) \
    \( -clone 0 -resize 72x72 -write ../icons/icon-72x72.png \) \
    \( -clone 0 -resize 96x96 -write ../icons/icon-96x96.png \) \
    -alpha on null:
