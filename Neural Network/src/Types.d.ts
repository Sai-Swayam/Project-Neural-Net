export interface Welcome {
    layers:  Layer[];
    version: number;
}

export interface Layer {
    Type:         string;
    params:       string[];
    param_desc:   ParamDesc;
    description?: string;
    href?:        string;
}

export interface ParamDesc {
    activation?:             Activation;
    l1?:                     Alpha;
    l2?:                     Alpha;
    use_scale?:              Axes;
    dropout?:                Alpha;
    score_mode?:             Axes;
    seed?:                   AttentionAxes;
    pool_size?:              Alpha;
    strides?:                Strides;
    padding?:                Alpha;
    data_format?:            Activation;
    axis?:                   Alpha;
    momentum?:               Alpha;
    epsilon?:                Alpha;
    center?:                 Axes;
    scale?:                  Alpha;
    synchronized?:           Synchronized;
    num_tokens?:             Alpha;
    output_mode?:            Axes;
    height?:                 Alpha;
    width?:                  Alpha;
    filters?:                Alpha;
    kernel_size?:            Alpha;
    dilation_rate?:          DilationRate;
    groups?:                 Alpha;
    use_bias?:               Axes;
    recurrent_activation?:   Axes;
    unit_forget_bias?:       Axes;
    recurrent_dropout?:      Alpha;
    return_sequences?:       Axes;
    return_state?:           Axes;
    go_backwards?:           Axes;
    stateful?:               Axes;
    unroll?:                 Axes;
    cropping?:               Cropping;
    units?:                  Alpha;
    lora_rank?:              AttentionAxes;
    axes?:                   Axes;
    normalize?:              Axes;
    rate?:                   Alpha;
    noise_shape?:            Activation;
    alpha?:                  Alpha;
    input_dim?:              Alpha;
    output_dim?:             Alpha;
    mask_zero?:              Axes;
    input_length?:           AttentionAxes;
    reset_after?:            Axes;
    stddev?:                 Alpha;
    keepdims?:               Axes;
    description?:            string;
    href?:                   string;
    head_dim?:               Alpha;
    num_query_heads?:        Alpha;
    num_key_value_heads?:    Alpha;
    input_shape?:            InputShape;
    batch_size?:             AttentionAxes;
    dtype?:                  Dtype;
    sparse?:                 Ragged;
    ragged?:                 Ragged;
    rms_scaling?:            Axes;
    negative_slope?:         Alpha;
    mask_value?:             Alpha;
    num_heads?:              Alpha;
    key_dim?:                Alpha;
    value_dim?:              AttentionAxes;
    output_shape?:           AttentionAxes;
    attention_axes?:         AttentionAxes;
    mean?:                   AttentionAxes;
    variance?:               AttentionAxes;
    invert?:                 Axes;
    shared_axes?:            AttentionAxes;
    dims?:                   Cropping;
    max_value?:              AttentionAxes;
    threshold?:              Alpha;
    n?:                      Alpha;
    offset?:                 Alpha;
    target_shape?:           Cropping;
    max_tokens?:             AttentionAxes;
    standardize?:            Axes;
    split?:                  Axes;
    ngrams?:                 InputShape;
    output_sequence_length?: AttentionAxes;
    pad_to_max_tokens?:      Axes;
    vocabulary?:             Axes;
    encoding?:               Axes;
    size?:                   Alpha;
    interpolation?:          Activation;
}

export interface Activation {
    type:        ActivationType;
    options?:    string[];
    description: string;
    default:     ActivationDefault;
    required:    boolean;
}

export enum ActivationDefault {
    ChannelsLast = "channels_last",
    Linear = "linear",
    Nearest = "nearest",
    Null = "null",
    Tanh = "tanh",
}

export enum ActivationType {
    Bool = "bool",
    Dropdown = "dropdown",
    Float = "float",
    Int = "int",
    List = "list",
}

export interface Alpha {
    type:        ActivationType;
    min?:        number | null;
    max?:        number | null;
    description: string;
    default?:    boolean | number | null | string;
    required:    boolean;
    min_size?:   number;
    max_size?:   number | null;
    options?:    Option[];
}

export enum Option {
    Causal = "causal",
    Same = "same",
    Valid = "valid",
}

export interface AttentionAxes {
    type:        AttentionAxesType[];
    min:         number | null;
    max:         null;
    description: string;
    default:     ActivationDefault;
    required:    boolean;
}

export enum AttentionAxesType {
    Float = "float",
    Int = "int",
    Null = "null",
}

export interface Axes {
    type:        AxesType;
    description: string;
    required?:   boolean;
    default?:    boolean | string;
    options?:    string[];
}

export enum AxesType {
    Bool = "bool",
    Dropdown = "dropdown",
    FilePath = "file_path",
    Int = "int",
    String = "string",
}

export interface Cropping {
    type:        ActivationType;
    min_size:    number;
    max_size:    number | null;
    description: string;
    default?:    CroppingDefault;
    required:    boolean;
}

export enum CroppingDefault {
    Null = "null",
    The11 = "1,1",
    The111 = "1,1,1",
}

export interface DilationRate {
    type:        ActivationType[] | ActivationType;
    description: string;
    default:     CroppingDefault | number;
    required:    boolean;
    min_size?:   number;
    max_size?:   number;
}

export interface Dtype {
    type:        string[];
    description: string;
    default:     ActivationDefault;
    required:    boolean;
}

export interface InputShape {
    type:        string[];
    min_size:    number | null;
    max_size:    null;
    description: string;
    default:     ActivationDefault;
    required:    boolean;
}

export interface Ragged {
    type:        string[] | ActivationType;
    description: string;
    default:     boolean | ActivationDefault;
    required:    boolean;
}

export interface Strides {
    type:        Array<AttentionAxesType | null> | ActivationType;
    min?:        number | null;
    max?:        null;
    description: string;
    default:     CroppingDefault | number;
    required:    boolean;
    min_size?:   number;
    max_size?:   number;
}

export interface Synchronized {
    type:        ActivationType;
    description: string;
}
