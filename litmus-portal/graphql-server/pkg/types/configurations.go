package types

// SubscriberConfigurationVars contains the required configurable parameters for subscriber installation
type SubscriberConfigurationVars struct {
	AgentNamespace           string
	AgentScope               string
	GQLServerURI             string
	SubscriberImage          string
	EventTrackerImage        string
	WorkflowControllerImage  string
	ChaosOperatorImage       string
	WorkflowExecutorImage    string
	ChaosRunnerImage         string
	ChaosExporterImage       string
	ContainerRuntimeExecutor string
}
