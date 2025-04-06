--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-06 16:30:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16440)
-- Name: entrada; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entrada (
    id integer NOT NULL,
    mercadoria_id integer NOT NULL,
    quantidade integer NOT NULL,
    data_hora timestamp without time zone NOT NULL,
    local character varying NOT NULL
);


ALTER TABLE public.entrada OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16439)
-- Name: entrada_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entrada_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entrada_id_seq OWNER TO postgres;

--
-- TOC entry 4814 (class 0 OID 0)
-- Dependencies: 219
-- Name: entrada_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entrada_id_seq OWNED BY public.entrada.id;


--
-- TOC entry 218 (class 1259 OID 16429)
-- Name: mercadoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mercadoria (
    id integer NOT NULL,
    nome character varying NOT NULL,
    numero_registro character varying NOT NULL,
    fabricante character varying NOT NULL,
    tipo character varying NOT NULL,
    descricao character varying
);


ALTER TABLE public.mercadoria OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16428)
-- Name: mercadoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mercadoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mercadoria_id_seq OWNER TO postgres;

--
-- TOC entry 4815 (class 0 OID 0)
-- Dependencies: 217
-- Name: mercadoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mercadoria_id_seq OWNED BY public.mercadoria.id;


--
-- TOC entry 222 (class 1259 OID 16454)
-- Name: saida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saida (
    id integer NOT NULL,
    mercadoria_id integer NOT NULL,
    quantidade integer NOT NULL,
    data_hora timestamp without time zone NOT NULL,
    local character varying NOT NULL
);


ALTER TABLE public.saida OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16453)
-- Name: saida_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saida_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saida_id_seq OWNER TO postgres;

--
-- TOC entry 4816 (class 0 OID 0)
-- Dependencies: 221
-- Name: saida_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saida_id_seq OWNED BY public.saida.id;


--
-- TOC entry 4652 (class 2604 OID 16443)
-- Name: entrada id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrada ALTER COLUMN id SET DEFAULT nextval('public.entrada_id_seq'::regclass);


--
-- TOC entry 4651 (class 2604 OID 16432)
-- Name: mercadoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mercadoria ALTER COLUMN id SET DEFAULT nextval('public.mercadoria_id_seq'::regclass);


--
-- TOC entry 4653 (class 2604 OID 16457)
-- Name: saida id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saida ALTER COLUMN id SET DEFAULT nextval('public.saida_id_seq'::regclass);


--
-- TOC entry 4659 (class 2606 OID 16447)
-- Name: entrada entrada_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrada
    ADD CONSTRAINT entrada_pkey PRIMARY KEY (id);


--
-- TOC entry 4655 (class 2606 OID 16438)
-- Name: mercadoria mercadoria_numero_registro_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mercadoria
    ADD CONSTRAINT mercadoria_numero_registro_key UNIQUE (numero_registro);


--
-- TOC entry 4657 (class 2606 OID 16436)
-- Name: mercadoria mercadoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mercadoria
    ADD CONSTRAINT mercadoria_pkey PRIMARY KEY (id);


--
-- TOC entry 4661 (class 2606 OID 16461)
-- Name: saida saida_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saida
    ADD CONSTRAINT saida_pkey PRIMARY KEY (id);


--
-- TOC entry 4662 (class 2606 OID 16448)
-- Name: entrada entrada_mercadoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrada
    ADD CONSTRAINT entrada_mercadoria_id_fkey FOREIGN KEY (mercadoria_id) REFERENCES public.mercadoria(id);


--
-- TOC entry 4663 (class 2606 OID 16462)
-- Name: saida saida_mercadoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saida
    ADD CONSTRAINT saida_mercadoria_id_fkey FOREIGN KEY (mercadoria_id) REFERENCES public.mercadoria(id);


-- Completed on 2025-04-06 16:30:09

--
-- PostgreSQL database dump complete
--

