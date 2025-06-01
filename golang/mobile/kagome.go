package kagome

import (
	"encoding/json"
	"strings"

	"github.com/ikawaha/kagome-dict/ipa"
	"github.com/ikawaha/kagome/v2/tokenizer"
)

func igOK(s string, _ bool) string {
	return s
}

func getJsonString(v any) string {
	jsonBytes, err := json.Marshal(v)
	if err != nil {
		return ""
	}
	jsonString := string(jsonBytes)
	return jsonString
}

func Wakati(text string) string {
	t, err := tokenizer.New(ipa.Dict(), tokenizer.OmitBosEos())
	if err != nil {
		return ""
	}
	seg := t.Wakati(text)

	result := getJsonString(seg)

	return result
}

func Tokenize(text string) string {
	if len(text) == 0 {
		return ""
	}

	t, err := tokenizer.New(ipa.Dict(), tokenizer.OmitBosEos())
	if err != nil {
		return ""
	}
	var ret []interface{}
	tokens := t.Tokenize(text)
	for _, v := range tokens {
		//fmt.Printf("%s\t%+v%v\n", v.Surface, v.POS(), strings.Join(v.Features(), ","))
		ret = append(ret, map[string]interface{}{
			"word_id":       v.ID,
			"word_type":     v.Class.String(),
			"word_position": v.Start,
			"features":      v.Features(),
			"surface_form":  v.Surface,
			"pos":           strings.Join(v.POS(), ","),
			"base_form":     igOK(v.BaseForm()),
			"reading":       igOK(v.Reading()),
			"pronunciation": igOK(v.Pronunciation()),
		})
	}
	result := getJsonString(ret)
	return result
}

func Analyze(text string, mode int) string {
	if len(text) == 0 {
		return ""
	}
	t, err := tokenizer.New(ipa.Dict(), tokenizer.OmitBosEos())
	if err != nil {
		return ""
	}
	var ret []interface{}
	tokens := t.Analyze(text, tokenizer.TokenizeMode(mode))
	for _, v := range tokens {
		//fmt.Printf("%s\t%+v%v\n", v.Surface, v.POS(), strings.Join(v.Features(), ","))
		ret = append(ret, map[string]interface{}{
			"word_id":       v.ID,
			"word_type":     v.Class.String(),
			"word_position": v.Start,
			"features":      v.Features(),
			"surface_form":  v.Surface,
			"pos":           strings.Join(v.POS(), ","),
			"base_form":     igOK(v.BaseForm()),
			"reading":       igOK(v.Reading()),
			"pronunciation": igOK(v.Pronunciation()),
		})
	}
	result := getJsonString(ret)
	return result
}

// func main() {
// 	text := "私はビールが好きですか？"

// 	Tokenize(text)

// }
