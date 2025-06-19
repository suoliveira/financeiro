import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import * as Progress from 'react-native-progress';

export default function App() {
  const [renda, setRenda] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const rendaFloat = parseFloat(renda.replace(",", "."));
    if (isNaN(rendaFloat) || rendaFloat <= 0) {
      setResultado(null);
      return;
    }

    const necessidades = rendaFloat * 0.5;
    const desejos = rendaFloat * 0.3;
    const investimentos = rendaFloat * 0.2;

    setResultado({ necessidades, desejos, investimentos });
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Simulador 50/30/20</Text>

      <Text style={styles.label}>Informe sua renda mensal (R$):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 3000"
        value={renda}
        onChangeText={setRenda}
      />

      <TouchableOpacity style={styles.button} onPress={calcular}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultContainer}>
          <Text style={styles.subtitle}>Distribuição:</Text>

          <View style={styles.progressContainer}>
            <Progress.Pie
              size={120}
              progress={0.5}
              showsText={true}
              formatText={() => '50%'}
              color="#ff385e"
              borderWidth={4}
            />
            <Text style={styles.desc}>Necessidades{'\n'}R$ {resultado.necessidades}</Text>
          </View>

          <View style={styles.progressContainer}>
            <Progress.Pie
              size={120}
              progress={0.3}
              showsText={true}
              formatText={() => '30%'}
              color="#50a14f"
              borderWidth={4}
            />
            <Text style={styles.desc}>Desejos{'\n'}R$ {resultado.desejos}</Text>
          </View>

          <View style={styles.progressContainer}>
            <Progress.Pie
              size={120}
              progress={0.2}
              showsText={true}
              formatText={() => '20%'}
              color="#674ea7"
              borderWidth={4}
            />
            <Text style={styles.desc}>Poupança{'\n'}R$ {resultado.investimentos}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#C71585',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333',
    fontWeight: '600',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  desc: {
    marginTop: 8,
    textAlign: 'center',
    color: '#555',
    fontSize: 15,
  },
});
