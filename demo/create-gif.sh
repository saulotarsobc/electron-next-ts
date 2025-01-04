#!/bin/bash

# Gerar a paleta de cores
ffmpeg -i demo.mp4 -vf "fps=30,scale=720:-1:flags=lanczos,palettegen" palette.png

# Usar a paleta de cores para criar o GIF
ffmpeg -i demo.mp4 -i palette.png -filter_complex "fps=30,scale=720:-1:flags=lanczos[x];[x][1:v]paletteuse" -c:v gif demo.gif

# Remover a paleta de cores temporária
rm palette.png