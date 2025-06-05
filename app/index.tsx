import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';

type Task = {
  id: number;
  title: string;
  done?: boolean;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const fetchTasks = () => {
    axios.get<Task[]>('http://127.0.0.1:8000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`)
              .then(() => fetchTasks()) // Recarrega a lista
              .catch(error => console.error(error));
          }
        }
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        ListEmptyComponent={<Text style={styles.emptyText}>Sem tarefas ainda 💖</Text>}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={[styles.taskTitle, item.done && styles.done]}>
              {item.title}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={tasks.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/create')}
      >
        <Text style={styles.addButtonText}>＋ Nova tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F8',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  taskItem: {
    backgroundColor: '#FFE4E6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#D6336C',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    color: '#6D214F',
    fontWeight: '500',
    flex: 1,
    marginRight: 10,
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#A88CA0',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 20,
    color: '#A88CA0',
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#D6336C',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#D6336C',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
