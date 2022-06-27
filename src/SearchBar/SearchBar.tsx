import React, { useState } from 'react'
import Select from 'react-select'
import { Button } from '../components/Button'
import { POKEMON_LIST } from '../constants'
import { TrashIcon } from '@radix-ui/react-icons'
import { Flex } from '../components/Flex'
import { keyframes, styled, theme } from '../stitches.config'

interface SearchBarProps {
  targetValue: number
  initialValue: { value: number; label: string | undefined }
  animateKey: number
  handleRemove: (target: number) => void
  updatePokemon: (
    target: number,
    data: { value: number; label: string | undefined }
  ) => void
  resetAnimateKey: (arg: number) => void
}

const transformedOptions = POKEMON_LIST.map((x) => ({
  value: x.id,
  label: x.name,
}))
const IconButtonFilled = styled(Button, {
  ml: '$3',
  '& path': {
    fill: '$primary10',
    fillRule: 'nonzero',
    clipRule: 'nonzero',
  },
  '&:hover': {
    '& path': {
      fill: '$primary11',
    },
  },
})
const enterAnimation = keyframes({
  '0%': { transform: 'scale(0)' },
  '100%': { transform: 'translateX(1)' },
})
const exitAnimation = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0)' },
})

export const SearchBar = ({
  targetValue,
  initialValue,
  animateKey,
  handleRemove,
  updatePokemon,
  resetAnimateKey,
}: SearchBarProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  // someone is typing
  const handleInputChange = (newValue: string) => {
    console.log(`inputChange => ${targetValue}`, newValue)
  }
  // option selected
  const handleSelect = (
    newValue: { value: number; label: string | undefined } | null
  ) => {
    console.log(`inputSELECT => ${targetValue}`, newValue?.label)
    if (newValue) {
      updatePokemon(targetValue, newValue)
    }
  }

  const AnimatedRow = styled(Flex, {
    padding: '$2',
    [`&.row-${animateKey}`]: {
      animation: `${enterAnimation} 300ms linear`,
    },
    [`&[data-delete='true']`]: {
      animation: `${exitAnimation} 300ms linear`,
    },
  })

  const handleAnimationEnd = () => {
    console.log(`Animation End block ${targetValue}`)
    if (isDeleting) {
      setIsDeleting(false)
      handleRemove(targetValue)
    }
    resetAnimateKey(-1)
  }

  const onDeleteClick = () => {
    console.log('deleteClicked', targetValue)
    setIsDeleting(true)
  }

  const customStyles = {
    option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
      ...provided,
      color: state.isSelected
        ? `${theme.colors.inverse}`
        : `${theme.colors.primary10}`,
      backgroundColor: state.isSelected
        ? `${theme.colors.primary9}`
        : state.isFocused
        ? `${theme.colors.primary4}`
        : `${theme.colors.appBg2}`,
      [`.yellow-theme &`]: {
        backgroundColor: state.isSelected
          ? `${theme.colors.primary9}`
          : state.isFocused
          ? `${theme.colors.blue8}`
          : `${theme.colors.appBg2}`,
      },
      padding: `${theme.space[2]}`,
    }),
    container: (provided: any) => ({
      ...provided,
      width: 200,
    }),
    control: (provided: any, state: { isFocused: any }) => ({
      ...provided,
      backgroundColor: `${theme.colors.appBg1}`,
      ':hover': {
        borderColor: `${theme.colors.primary10}`,
      },
      boxShadow: state.isFocused
        ? `0 0 0 1px ${theme.colors.primary10}`
        : undefined,
      borderColor: state.isFocused
        ? `${theme.colors.primary10}`
        : `${theme.colors.slate7}`,
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: `${theme.colors.appBg2}`,
    }),
    input: (provided: any) => ({
      ...provided,
      color: `${theme.colors.hiContrast}`,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: `${theme.colors.slate10}`,
      [`.yellow-theme &`]: {
        color: `${theme.colors.whiteA11}`,
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      [`.yellow-theme &`]: {
        color: `${theme.colors.hiContrast}`,
      },
      [`.dark-theme &`]: {
        color: `${theme.colors.hiContrast}`,
      },
    }),
    noOptionsMessage: (provided: any) => ({
      ...provided,
      [`.yellow-theme &`]: {
        color: `${theme.colors.whiteA11}`,
      },
    }),
  }

  return (
    <AnimatedRow
      css={{ '&[option]': { color: 'green' } }}
      data-delete={isDeleting}
      onAnimationEnd={handleAnimationEnd}
      className={`row-${targetValue}`}
      direction={'row'}
    >
      <Select
        styles={customStyles}
        defaultValue={initialValue.label ? initialValue : undefined}
        isClearable={true}
        isSearchable={true}
        onInputChange={handleInputChange}
        onChange={handleSelect}
        name={'pokemon-select'}
        options={transformedOptions}
      />
      <IconButtonFilled variant={'outline'} onClick={onDeleteClick}>
        <TrashIcon />
      </IconButtonFilled>
    </AnimatedRow>
  )
}
