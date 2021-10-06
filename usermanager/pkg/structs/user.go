package structs

type User struct {
	UUID      string   `json:"id" bson:"id"`
	FirstName string   `json:"first_name" bson:"first_name"`
	LastName  string   `json:"last_name" bson:"last_name"`
	Login     string   `json:"login" bson:"login"`
	Pwd       string   `json:"pwd" bson:"pwd"`
	Token     string   `json:"token" bson:"token"`
	Roles     []string `json:"roles" bson:"roles"`
}
