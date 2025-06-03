//go:build js && wasm
// +build js,wasm

package main

import (
	"bytes"
	"strings"
	"syscall/js"

	"github.com/ikawaha/kagome-dict/ipa"
	"github.com/ikawaha/kagome/v2/tokenizer"
)

func igOK(s string, _ bool) string {
	return s
}

func wakati(_ js.Value, args []js.Value) interface{} {
	if len(args) == 0 {
		return nil
	}
	t, err := tokenizer.New(ipa.Dict(), tokenizer.OmitBosEos())
	if err != nil {
		return nil
	}
	seg := t.Wakati(args[0].String())

	var ret interface{}

	ret = map[string]interface{}{
		"words": strings.Join(seg, ","),
	}

	return ret
}

func tokenize(_ js.Value, args []js.Value) interface{} {
	if len(args) == 0 {
		return nil
	}
	t, err := tokenizer.New(ipa.Dict(), tokenizer.OmitBosEos())
	if err != nil {
		return nil
	}
	var ret []interface{}
	tokens := t.Tokenize(args[0].String())
	for _, v := range tokens {
		//fmt.Printf("%s\t%+v%v\n", v.Surface, v.POS(), strings.Join(v.Features(), ","))
		ret = append(ret, map[string]interface{}{
			"word_id":       v.ID,
			"word_type":     v.Class.String(),
			"word_position": v.Start,
			"features":      strings.Join(v.Features(), ","),
			"surface_form":  v.Surface,
			"pos":           strings.Join(v.POS(), ","),
			"base_form":     igOK(v.BaseForm()),
			"reading":       igOK(v.Reading()),
			"pronunciation": igOK(v.Pronunciation()),
		})
	}
	return ret
}

func analyze(_ js.Value, args []js.Value) interface{} {
	println(args)
	if len(args) == 0 {
		return nil
	}
	t, err := tokenizer.New(ipa.Dict(), tokenizer.OmitBosEos())
	if err != nil {
		return ""
	}
	var ret []interface{}
	tokens := t.Analyze(args[0].String(), tokenizer.TokenizeMode(args[1].Int()))
	for _, v := range tokens {
		//fmt.Printf("%s\t%+v%v\n", v.Surface, v.POS(), strings.Join(v.Features(), ","))
		ret = append(ret, map[string]interface{}{
			"word_id":       v.ID,
			"word_type":     v.Class.String(),
			"word_position": v.Start,
			"features":      strings.Join(v.Features(), ","),
			"surface_form":  v.Surface,
			"pos":           strings.Join(v.POS(), ","),
			"base_form":     igOK(v.BaseForm()),
			"reading":       igOK(v.Reading()),
			"pronunciation": igOK(v.Pronunciation()),
		})
	}
	return ret
}

func graph(_ js.Value, args []js.Value) interface{} {
	if len(args[0].String()) == 0 {
		return ""
	}
	t, err := tokenizer.New(ipa.Dict(), tokenizer.OmitBosEos())
	if err != nil {
		return ""
	}

	var buf bytes.Buffer
	var dot interface{}
	t.AnalyzeGraph(&buf, args[0].String(), tokenizer.TokenizeMode(args[1].Int()))
	// return buf.String()
	dot = map[string]interface{}{
		"dot": buf.String(),
	}

	return dot
}

func registerCallbacks() {
	_ = ipa.Dict()
	js.Global().Set("tokenize", js.FuncOf(tokenize))
	js.Global().Set("analyze", js.FuncOf(analyze))
	js.Global().Set("wakati", js.FuncOf(wakati))
	js.Global().Set("graph", js.FuncOf(graph))
}

func main() {
	c := make(chan struct{}, 0)
	registerCallbacks()
	println("Kagome Web Assembly Ready")
	<-c
}
