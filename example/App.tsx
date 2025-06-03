import { useEvent } from 'expo';
import { getTokens, getAnalysis, getWakati, getGraph, AnalyzeMode, Token, initializeKagomeAsync } from 'expo-kagome';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Platform, SafeAreaView, ScrollView, StatusBar, Text, TextInput, View, useColorScheme } from 'react-native';
import { SvgFromXml } from 'react-native-svg';

const fetchGraphviz = async (graph: string) => {
  const body = {
    graph: graph,
    layout: 'dot',
    format: 'svg',
  };
  const result = await fetch('https://quickchart.io/graphviz', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const svg = await result.text();
  return svg;
};

export default function App() {
  const [text, setText] = useState('冬が近づくにつれて日が短くなる。');
  const [selectedMode, setSelectedMode] = useState<AnalyzeMode>('normal');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [wakati, setWakati] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWakatiLoading, setIsWakatiLoading] = useState(false);
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [graphSvg, setGraphSvg] = useState<string | null>();

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
      setTokens([]);
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
      setWakati([]);
      setIsWakatiLoading(true);
      const result = await getWakati(text);
      if (result) {
        setWakati(result);
      }
      setIsWakatiLoading(false);
    }
  };

  const onGraph = async () => {
    if (text.length > 0) {
      setGraphSvg(null);
      setIsGraphLoading(true);
      try {
        const dot = await getGraph(text);
        if (dot) {
          const svg = await fetchGraphviz(dot)
          svg && setGraphSvg(svg);
        }
      } catch (e) {
        console.warn(e);
      }
      setIsGraphLoading(false);
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
        <Text style={styles.header}>Expo Kagome</Text>
        <Group name='Input'>
          <View style={{width: '100%', alignItems: 'center'}}>
            <TextInput value={text} onChangeText={(txt) => setText(txt)} style={{width: '90%', padding: 12, borderWidth: 1, marginVertical: 20}} multiline />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingBottom: 12,}}>
            <Button title='Normal' onPress={() => onModeSelect('normal')} disabled={selectedMode === 'normal'} />
            <Button title='Search' onPress={() => onModeSelect('search')} disabled={selectedMode === 'search'} />
            <Button title='Extend' onPress={() => onModeSelect('extend')} disabled={selectedMode === 'extend'} />
          </View>
          <View style={{gap: 8}}>
            <Button title='Wakati' onPress={onWakati} disabled={!isWasmLoaded || isWakatiLoading} />
            <Button title='Lattice Graph' onPress={onGraph} disabled={!isWasmLoaded || isGraphLoading} />
            <Button title='Tokenize' onPress={onAnalyze} disabled={!isWasmLoaded || isLoading} />
          </View>
        </Group>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {['⬇️','⬇️', '⬇️'].map((txt, idx) => <Text selectable={false} key={idx}>{txt}</Text>)}
        </View>
        <Group name="Wakati" description='Segment Japanese text into words'>
          {isWakatiLoading && <ActivityIndicator />}
          {wakati.length > 0 && (
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text>{wakati.join(' - ')}</Text>
            </View>
          )}
        </Group>

        <Group name="Graph" description='A lattice graph of the tokenization process'>
          {isGraphLoading && <ActivityIndicator />}
          {graphSvg && (
            <View style={{width: '100%', alignItems: 'center'}}>
              <SvgFromXml xml={graphSvg} width="100%" height={300} />
            </View>
          )}
        </Group>

        <Group name="Analysis" description='Tokenized Japanese text'>
          {isLoading && <ActivityIndicator />}
          {tokens.length > 0 && (
            <View style={{width: '100%', alignItems: 'center'}}>
              {tokens.map((token, index) => (
                <View key={index}  style={{width: '100%'}}>
                  <Text style={{fontSize: 24}}>{token.base_form}</Text>
                  <View style={{ width:'100%', borderWidth: 1, borderRadius: 12, padding: 12, marginVertical: 5}}>
                    <Text>{`Base form: ${token.base_form}`}</Text>
                    <Text>{`Reading: ${token.reading}`}</Text>
                    <Text>{`Pronunciation: ${token.pronunciation}`}</Text>
                    <Text>{`Part of Speech: ${token.pos.join(', ')}`}</Text>
                    <Text>{`Features: ${token.features.join(', ')}`}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </Group>
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
