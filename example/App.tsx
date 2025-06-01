import { useEvent } from 'expo';
import { getTokens, getAnalysis, getWakati, AnalyzeMode, Token, initializeKagomeAsync } from 'expo-kagome';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Platform, SafeAreaView, ScrollView, StatusBar, Text, TextInput, View, useColorScheme } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [selectedMode, setSelectedMode] = useState<AnalyzeMode>('normal');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [wakati, setWakati] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWakatiLoading, setIsWakatiLoading] = useState(false);

  const [isWasmLoaded, setIsWasmLoaded] = useState(Platform.OS === 'web' ? false : true);

  const themeColor = useColorScheme();

  const onModeSelect = (mode: AnalyzeMode) => {
    setSelectedMode(mode);
  };

  const onTokenize = async () => {
    if (text.length > 0) {
      setIsLoading(true);
      const result = await getTokens(text);
      if (result) {
        setTokens(result);
      }
      setIsLoading(false);
    }
  };

  const onAnalyze = async () => {
    if (text.length > 0) {
      setIsLoading(true);
      try {
        const result = await getAnalysis(text);
        if (result) {
          setTokens(result);
        }
      } catch (err) {
        console.error(err);
      }
      
      setIsLoading(false);
    }
  };

  const onWakati = async () => {
    if (text.length > 0) {
      setIsWakatiLoading(true);
      const result = await getWakati(text);
      if (result) {
        setWakati(result);
      }
      setIsWakatiLoading(false);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      initializeKagomeAsync().then(() => setIsWasmLoaded(true));
    }
  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={[styles.container]}>
      <Text style={styles.header}>Kagome React Native</Text>
        <Group name='Analyze'>
          <View style={{width: '100%', alignItems: 'center'}}>
            <TextInput value={text} onChangeText={(txt) => setText(txt)} style={{width: '90%', padding: 12, borderWidth: 1, marginVertical: 20}} multiline />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingBottom: 12,}}>
            <Button title='Normal' onPress={() => onModeSelect('normal')} disabled={selectedMode === 'normal'} />
            <Button title='Search' onPress={() => onModeSelect('search')} disabled={selectedMode === 'search'} />
            <Button title='Extend' onPress={() => onModeSelect('extend')} disabled={selectedMode === 'extend'} />
          </View>
          <View style={{gap: 8}}>
            {isWakatiLoading ? <ActivityIndicator size={'small'} /> : <Button title='Wakati' onPress={onWakati} disabled={!isWasmLoaded} />}
            {isLoading ? <ActivityIndicator size={'small'} /> : <Button title='Tokenize' onPress={onAnalyze} disabled={!isWasmLoaded} />}
          </View>
        </Group>

        <Group name="Wakati" description='Segment Japanese text into words'>
          {wakati.length > 0 && (
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text>{wakati.join(' - ')}</Text>
            </View>
          )}
        </Group>

        <Group name="Analysis" description='Analyzing Japanese text into words and parts of speech'>
          {tokens.length > 0 && (
            <View style={{width: '100%', alignItems: 'center'}}>
              {tokens.map((token, index) => (
                <View key={index}  style={{width: '100%'}}>
                  <Text style={{fontSize: 24}}>{token.base_form}</Text>
                  <View style={{ width:'100%', borderWidth: 1, borderRadius: 12, padding: 12, marginVertical: 5}}>
                    <Text>{`Base form: ${token.base_form}`}</Text>
                    <Text>{`Reading: ${token.reading}`}</Text>
                    <Text>{`Pronunciation: ${token.pronunciation}`}</Text>
                    <Text>{`Part of Speech: ${token.pos}`}</Text>
                    <Text>{`Features: ${token.features.join(', ')}`}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </Group>
        
        {/* <Group name="Constants">
          <Text>{ExpoKagome.PI}</Text>
        </Group>
        <Group name="Functions">
          <Text>{ExpoKagome.hello()}</Text>
        </Group>
        <Group name="Async functions">
          <Button
            title="Set value"
            onPress={async () => {
              await ExpoKagome.setValueAsync('Hello from JS!');
            }}
          />
        </Group>
        <Group name="Events">
          <Text>{onChangePayload?.value}</Text>
        </Group>
        <Group name="Views">
          <ExpoKagomeView
            url="https://www.example.com"
            onLoad={({ nativeEvent: { url } }) => console.log(`Loaded: ${url}`)}
            style={styles.view}
          />
        </Group> */}
      </ScrollView>
      <StatusBar barStyle={themeColor === 'dark' ? 'dark-content' : 'light-content'} />
    </SafeAreaView>
  );
}

function Group(props: { name: string; description?: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      <Text style={styles.groupDescription}>{props.description}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    // marginBottom: 20,
  },
  groupDescription: {
    fontSize: 14,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
