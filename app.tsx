import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskList from './screens/TaskList';
import CreateTask from './screens/CreateTask';

export type RootStackParamList = {
  TaskList: undefined;
  CreateTask: undefined;
};



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen
          name="TaskList"
          component={TaskList}
          options={{ title: 'Lista de Tarefas' }}
        />
        <Stack.Screen
          name="CreateTask"
          component={CreateTask}
          options={{ title: 'Criar Tarefa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
