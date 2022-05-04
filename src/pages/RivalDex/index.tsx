import React from 'react';
import { Flex } from '../../components/Flex';
import { RivalSelect } from './RivalSelect';
import { Button } from '../../components/Button';
import { TopBanner } from './TopBanner';

const RivalDex = () => {
  return (
    <>
      <TopBanner />
      <Flex
        direction={'row'}
        justify={'center'}
        align={'center'}
        css={{ pb: '$5' }}
      >
        <a href='#team'>
          <Button
            variant={'primary'}
            size={'2'}
            shape={'2'}
            css={{ textTransform: 'capitalize' }}
          >
            View Starters
          </Button>
        </a>
      </Flex>
      <Flex direction={'column'} align={'center'} justify={'start'}>
        <RivalSelect />
      </Flex>
    </>
  );
};

export default RivalDex;
