import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título não pode estar vazio');
      return;
    }

    axios.post('http://127.0.0.1:8000/api/tasks', { title })
      .then(() => {
        setTitle('');
        router.back(); // Volta para a tela anterior (index)
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível salvar a tarefa');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Escreva sua tarefa aqui..."
        placeholderTextColor="#A88CA0"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleCreate}>
        <Text style={styles.saveButtonText}>Salvar tarefa</Text>
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
  input: {
    backgroundColor: '#FFE4E6',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#6D214F',
    fontWeight: '500',
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: '#D6336C',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#D6336C',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
//Maryana