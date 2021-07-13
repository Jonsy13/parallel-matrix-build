package image_registry

type ImageRegistry struct {
	ImageRegistryID   string  `bson:"image_registry_id"`
	ProjectID         string  `bson:"project_id"`
	ImageRegistryName string  `bson:"image_registry_name"`
	ImageRepoName     string  `bson:"image_repo_name"`
	ImageRegistryType string  `bson:"image_registry_type"`
	SecretName        *string `bson:"secret_name"`
	SecretNamespace   *string `bson:"secret_namespace"`
	IsDefault         bool    `bson:"is_default"`
	EnableRegistry    *bool   `bson:"enable_registry"`
	UpdatedAt         string  `bson:"updated_at"`
	CreatedAt         *string `bson:"created_at"`
	IsRemoved         bool    `bson:"is_removed"`
}
