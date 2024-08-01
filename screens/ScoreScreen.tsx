import ScorePage from '@/components/(score)/ScorePage';
import { RootStackParamList } from '@/utils/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react'

type ScoreRouteProp = RouteProp<RootStackParamList, "Score">;

const ScoreScreen = () => {
    const route = useRoute<ScoreRouteProp>();
    const { score } = route.params;

  return (
    <ScorePage score={score}/>
  )
}

export default ScoreScreen