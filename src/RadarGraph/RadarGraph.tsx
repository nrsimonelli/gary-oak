import React from 'react'
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from 'recharts'
import { Box } from '../components/Box'
import { STAT_MAX } from '../constants'
import { useAppSelector } from '../utils/hooks'
import { theme } from '../stitches.config'

export const RadarGraph = () => {
  const featuredPokemon = useAppSelector(
    (state) => state.display.featuredPokemon
  )

  const test = [
    {
      stat: 'Hp',
      [featuredPokemon[0]?.name]: featuredPokemon[0]?.hp,
      [featuredPokemon[1]?.name]: featuredPokemon[1]?.hp,
      [featuredPokemon[2]?.name]: featuredPokemon[2]?.hp,
      max: STAT_MAX.Hp,
    },
    {
      stat: 'Atk',
      [featuredPokemon[0]?.name]: featuredPokemon[0]?.attack,
      [featuredPokemon[1]?.name]: featuredPokemon[1]?.attack,
      [featuredPokemon[2]?.name]: featuredPokemon[2]?.attack,
      max: STAT_MAX.Atk,
    },
    {
      stat: 'Def',
      [featuredPokemon[0]?.name]: featuredPokemon[0]?.defense,
      [featuredPokemon[1]?.name]: featuredPokemon[1]?.defense,
      [featuredPokemon[2]?.name]: featuredPokemon[2]?.defense,
      max: STAT_MAX.Def,
    },
    {
      stat: 'SpA',
      [featuredPokemon[0]?.name]: featuredPokemon[0]?.['special-attack'],
      [featuredPokemon[1]?.name]: featuredPokemon[1]?.['special-attack'],
      [featuredPokemon[2]?.name]: featuredPokemon[2]?.['special-attack'],
      max: STAT_MAX.SpA,
    },
    {
      stat: 'SpD',
      [featuredPokemon[0]?.name]: featuredPokemon[0]?.['special-defense'],
      [featuredPokemon[1]?.name]: featuredPokemon[1]?.['special-defense'],
      [featuredPokemon[2]?.name]: featuredPokemon[2]?.['special-defense'],
      max: STAT_MAX.SpD,
    },
    {
      stat: 'Speed',
      [featuredPokemon[0]?.name]: featuredPokemon[0]?.speed,
      [featuredPokemon[1]?.name]: featuredPokemon[1]?.speed,
      [featuredPokemon[2]?.name]: featuredPokemon[2]?.speed,
      max: STAT_MAX.Speed,
    },
  ]

  return (
    <Box css={{ height: '300px', width: '320px' }}>
      <ResponsiveContainer width='100%' height='100%'>
        <RadarChart cx='50%' cy='50%' outerRadius='80%' data={test}>
          <PolarGrid radialLines={false} stroke={`${theme.colors.slate7}`} />
          <PolarAngleAxis
            dataKey='stat'
            axisLine={false}
            tickLine={false}
            stroke={`${theme.colors.hiContrast}`}
          />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Legend
            // margin={{ top: 8 }}
            iconType={'line'}
            align={'center'}
            verticalAlign={'bottom'}
            layout={'horizontal'}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: `${theme.colors.appBg3}`,
              color: `${theme.colors.hiContrast}`,
              textTransform: 'capitalize',
            }}
          />
          <Radar
            name={featuredPokemon[0]?.name}
            dataKey={featuredPokemon[0]?.name}
            stroke={`${theme.colors.data1}`}
            fill={`${theme.colors.data1}`}
            fillOpacity={0.4}
          />
          <Radar
            name={featuredPokemon[1]?.name}
            dataKey={featuredPokemon[1]?.name}
            stroke={`${theme.colors.data2}`}
            fill={`${theme.colors.data2}`}
            fillOpacity={0.4}
          />
          <Radar
            name={featuredPokemon[2]?.name}
            dataKey={featuredPokemon[2]?.name}
            stroke={`${theme.colors.data3}`}
            fill={`${theme.colors.data3}`}
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  )
}
