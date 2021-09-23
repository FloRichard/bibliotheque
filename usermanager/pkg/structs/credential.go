package structs

type Credential struct {
	Login    string `json:"login" bson:"login"`
	Password string `json:"pwd" bson:"pwd"`
}
