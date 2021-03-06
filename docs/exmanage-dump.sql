PGDMP     9                	    x        	   ex-manage    12.3    13.0 @               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16415 	   ex-manage    DATABASE     _   CREATE DATABASE "ex-manage" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF8';
    DROP DATABASE "ex-manage";
                cloudsqlsuperuser    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                cloudsqlsuperuser    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   cloudsqlsuperuser    false    4                        0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM cloudsqladmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO cloudsqlsuperuser;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   cloudsqlsuperuser    false    4            �            1259    18334    Events    TABLE     �  CREATE TABLE public."Events" (
    id integer NOT NULL,
    public_id uuid,
    name character varying(255) NOT NULL,
    website character varying(255),
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    organisation uuid,
    parent uuid,
    landing_page uuid,
    "createdBy" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Events";
       public         heap    postgres    false    4            �            1259    18332    Events_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Events_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Events_id_seq";
       public          postgres    false    4    208            !           0    0    Events_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Events_id_seq" OWNED BY public."Events".id;
          public          postgres    false    207            �            1259    18362    Itineraries    TABLE     �  CREATE TABLE public."Itineraries" (
    id integer NOT NULL,
    public_id uuid,
    name character varying(255) NOT NULL,
    website character varying(255),
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    event uuid,
    items jsonb,
    landing_page uuid,
    "createdBy" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."Itineraries";
       public         heap    postgres    false    4            �            1259    18360    Itineraries_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Itineraries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Itineraries_id_seq";
       public          postgres    false    210    4            "           0    0    Itineraries_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Itineraries_id_seq" OWNED BY public."Itineraries".id;
          public          postgres    false    209            �            1259    19275    Notices    TABLE     
  CREATE TABLE public."Notices" (
    id integer NOT NULL,
    public_id uuid,
    message jsonb NOT NULL,
    "createdBy" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    page uuid,
    itinerary uuid
);
    DROP TABLE public."Notices";
       public         heap    postgres    false    4            �            1259    19273    Notices_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Notices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Notices_id_seq";
       public          postgres    false    4    212            #           0    0    Notices_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Notices_id_seq" OWNED BY public."Notices".id;
          public          postgres    false    211            �            1259    18311    Organisations    TABLE     Y  CREATE TABLE public."Organisations" (
    id integer NOT NULL,
    public_id uuid,
    name character varying(255) NOT NULL,
    website character varying(255),
    user_id uuid,
    parent uuid,
    landing_page uuid,
    "createdBy" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."Organisations";
       public         heap    postgres    false    4            �            1259    18309    Organisations_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Organisations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Organisations_id_seq";
       public          postgres    false    4    206            $           0    0    Organisations_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Organisations_id_seq" OWNED BY public."Organisations".id;
          public          postgres    false    205            �            1259    18293    Pages    TABLE     [  CREATE TABLE public."Pages" (
    id integer NOT NULL,
    public_id uuid,
    title character varying(255) NOT NULL,
    url character varying(255),
    user_id uuid,
    parent uuid,
    content character varying(255),
    "createdBy" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Pages";
       public         heap    postgres    false    4            �            1259    18291    Pages_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Pages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Pages_id_seq";
       public          postgres    false    4    204            %           0    0    Pages_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Pages_id_seq" OWNED BY public."Pages".id;
          public          postgres    false    203            �            1259    19298    UserNotices    TABLE     �   CREATE TABLE public."UserNotices" (
    id integer NOT NULL,
    status character varying(255) NOT NULL,
    user_id uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."UserNotices";
       public         heap    postgres    false    4            �            1259    19296    UserNotices_id_seq    SEQUENCE     �   CREATE SEQUENCE public."UserNotices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."UserNotices_id_seq";
       public          postgres    false    214    4            &           0    0    UserNotices_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."UserNotices_id_seq" OWNED BY public."UserNotices".id;
          public          postgres    false    213            k           2604    18337 	   Events id    DEFAULT     j   ALTER TABLE ONLY public."Events" ALTER COLUMN id SET DEFAULT nextval('public."Events_id_seq"'::regclass);
 :   ALTER TABLE public."Events" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    208    208            l           2604    18365    Itineraries id    DEFAULT     t   ALTER TABLE ONLY public."Itineraries" ALTER COLUMN id SET DEFAULT nextval('public."Itineraries_id_seq"'::regclass);
 ?   ALTER TABLE public."Itineraries" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            m           2604    19278 
   Notices id    DEFAULT     l   ALTER TABLE ONLY public."Notices" ALTER COLUMN id SET DEFAULT nextval('public."Notices_id_seq"'::regclass);
 ;   ALTER TABLE public."Notices" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            j           2604    18314    Organisations id    DEFAULT     x   ALTER TABLE ONLY public."Organisations" ALTER COLUMN id SET DEFAULT nextval('public."Organisations_id_seq"'::regclass);
 A   ALTER TABLE public."Organisations" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    206    206            i           2604    18296    Pages id    DEFAULT     h   ALTER TABLE ONLY public."Pages" ALTER COLUMN id SET DEFAULT nextval('public."Pages_id_seq"'::regclass);
 9   ALTER TABLE public."Pages" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    204    204            n           2604    19301    UserNotices id    DEFAULT     t   ALTER TABLE ONLY public."UserNotices" ALTER COLUMN id SET DEFAULT nextval('public."UserNotices_id_seq"'::regclass);
 ?   ALTER TABLE public."UserNotices" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214                      0    18334    Events 
   TABLE DATA           �   COPY public."Events" (id, public_id, name, website, start_date, end_date, organisation, parent, landing_page, "createdBy", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    208   kP                 0    18362    Itineraries 
   TABLE DATA           �   COPY public."Itineraries" (id, public_id, name, website, start_date, end_date, event, items, landing_page, "createdBy", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   jV                 0    19275    Notices 
   TABLE DATA           s   COPY public."Notices" (id, public_id, message, "createdBy", "createdAt", "updatedAt", page, itinerary) FROM stdin;
    public          postgres    false    212   qp                 0    18311    Organisations 
   TABLE DATA           �   COPY public."Organisations" (id, public_id, name, website, user_id, parent, landing_page, "createdBy", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    206   �p                 0    18293    Pages 
   TABLE DATA           }   COPY public."Pages" (id, public_id, title, url, user_id, parent, content, "createdBy", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    204   2s                 0    19298    UserNotices 
   TABLE DATA           V   COPY public."UserNotices" (id, status, user_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   Os       '           0    0    Events_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Events_id_seq"', 33, true);
          public          postgres    false    207            (           0    0    Itineraries_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Itineraries_id_seq"', 48, true);
          public          postgres    false    209            )           0    0    Notices_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Notices_id_seq"', 1, false);
          public          postgres    false    211            *           0    0    Organisations_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Organisations_id_seq"', 9, true);
          public          postgres    false    205            +           0    0    Pages_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Pages_id_seq"', 1, false);
          public          postgres    false    203            ,           0    0    UserNotices_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."UserNotices_id_seq"', 1, false);
          public          postgres    false    213            x           2606    18342    Events Events_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_pkey";
       public            postgres    false    208            z           2606    18344    Events Events_public_id_key 
   CONSTRAINT     _   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_public_id_key" UNIQUE (public_id);
 I   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_public_id_key";
       public            postgres    false    208            |           2606    18370    Itineraries Itineraries_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Itineraries"
    ADD CONSTRAINT "Itineraries_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Itineraries" DROP CONSTRAINT "Itineraries_pkey";
       public            postgres    false    210            ~           2606    18372 %   Itineraries Itineraries_public_id_key 
   CONSTRAINT     i   ALTER TABLE ONLY public."Itineraries"
    ADD CONSTRAINT "Itineraries_public_id_key" UNIQUE (public_id);
 S   ALTER TABLE ONLY public."Itineraries" DROP CONSTRAINT "Itineraries_public_id_key";
       public            postgres    false    210            �           2606    19283    Notices Notices_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Notices"
    ADD CONSTRAINT "Notices_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Notices" DROP CONSTRAINT "Notices_pkey";
       public            postgres    false    212            �           2606    19285    Notices Notices_public_id_key 
   CONSTRAINT     a   ALTER TABLE ONLY public."Notices"
    ADD CONSTRAINT "Notices_public_id_key" UNIQUE (public_id);
 K   ALTER TABLE ONLY public."Notices" DROP CONSTRAINT "Notices_public_id_key";
       public            postgres    false    212            t           2606    18319     Organisations Organisations_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Organisations"
    ADD CONSTRAINT "Organisations_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Organisations" DROP CONSTRAINT "Organisations_pkey";
       public            postgres    false    206            v           2606    18321 )   Organisations Organisations_public_id_key 
   CONSTRAINT     m   ALTER TABLE ONLY public."Organisations"
    ADD CONSTRAINT "Organisations_public_id_key" UNIQUE (public_id);
 W   ALTER TABLE ONLY public."Organisations" DROP CONSTRAINT "Organisations_public_id_key";
       public            postgres    false    206            p           2606    18301    Pages Pages_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Pages"
    ADD CONSTRAINT "Pages_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Pages" DROP CONSTRAINT "Pages_pkey";
       public            postgres    false    204            r           2606    18303    Pages Pages_public_id_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Pages"
    ADD CONSTRAINT "Pages_public_id_key" UNIQUE (public_id);
 G   ALTER TABLE ONLY public."Pages" DROP CONSTRAINT "Pages_public_id_key";
       public            postgres    false    204            �           2606    19303    UserNotices UserNotices_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."UserNotices"
    ADD CONSTRAINT "UserNotices_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."UserNotices" DROP CONSTRAINT "UserNotices_pkey";
       public            postgres    false    214            �           2606    18355    Events Events_landing_page_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_landing_page_fkey" FOREIGN KEY (landing_page) REFERENCES public."Pages"(public_id);
 M   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_landing_page_fkey";
       public          postgres    false    208    3442    204            �           2606    18345    Events Events_organisation_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_organisation_fkey" FOREIGN KEY (organisation) REFERENCES public."Organisations"(public_id);
 M   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_organisation_fkey";
       public          postgres    false    206    208    3446            �           2606    18350    Events Events_parent_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_parent_fkey" FOREIGN KEY (parent) REFERENCES public."Events"(public_id);
 G   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_parent_fkey";
       public          postgres    false    3450    208    208            �           2606    18373 "   Itineraries Itineraries_event_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Itineraries"
    ADD CONSTRAINT "Itineraries_event_fkey" FOREIGN KEY (event) REFERENCES public."Events"(public_id);
 P   ALTER TABLE ONLY public."Itineraries" DROP CONSTRAINT "Itineraries_event_fkey";
       public          postgres    false    3450    208    210            �           2606    18378 )   Itineraries Itineraries_landing_page_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Itineraries"
    ADD CONSTRAINT "Itineraries_landing_page_fkey" FOREIGN KEY (landing_page) REFERENCES public."Pages"(public_id);
 W   ALTER TABLE ONLY public."Itineraries" DROP CONSTRAINT "Itineraries_landing_page_fkey";
       public          postgres    false    3442    210    204            �           2606    19291    Notices Notices_itinerary_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notices"
    ADD CONSTRAINT "Notices_itinerary_fkey" FOREIGN KEY (itinerary) REFERENCES public."Itineraries"(public_id) ON UPDATE CASCADE ON DELETE SET NULL;
 L   ALTER TABLE ONLY public."Notices" DROP CONSTRAINT "Notices_itinerary_fkey";
       public          postgres    false    212    3454    210            �           2606    19286    Notices Notices_page_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notices"
    ADD CONSTRAINT "Notices_page_fkey" FOREIGN KEY (page) REFERENCES public."Pages"(public_id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public."Notices" DROP CONSTRAINT "Notices_page_fkey";
       public          postgres    false    204    3442    212            �           2606    18327 -   Organisations Organisations_landing_page_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Organisations"
    ADD CONSTRAINT "Organisations_landing_page_fkey" FOREIGN KEY (landing_page) REFERENCES public."Pages"(public_id);
 [   ALTER TABLE ONLY public."Organisations" DROP CONSTRAINT "Organisations_landing_page_fkey";
       public          postgres    false    3442    206    204            �           2606    18322 '   Organisations Organisations_parent_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Organisations"
    ADD CONSTRAINT "Organisations_parent_fkey" FOREIGN KEY (parent) REFERENCES public."Organisations"(public_id);
 U   ALTER TABLE ONLY public."Organisations" DROP CONSTRAINT "Organisations_parent_fkey";
       public          postgres    false    206    3446    206            �           2606    18304    Pages Pages_parent_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Pages"
    ADD CONSTRAINT "Pages_parent_fkey" FOREIGN KEY (parent) REFERENCES public."Pages"(public_id);
 E   ALTER TABLE ONLY public."Pages" DROP CONSTRAINT "Pages_parent_fkey";
       public          postgres    false    3442    204    204               �  x�՘YkGǟg>ž�wU_���`L�B�K��b���]�&�>5>��N��I@!P����_�)��ZeJ�jTL�Bt,WL�!W��G]�a}���P��ݻ������:�ͪ#E
�B�Q)��F��2-��{��G��,[��X$H�V@j��MS�IX��������u�������c������u	.XK�0���y})��ԣ�	M����<�,$�s<YR*���0�����S��c�� �`�4,8e����)Z��
+��$紜��HI.W0.cv5z����-�Z�g���zt�m�K(�"����'0U�7WQ����{���i3#��ԣ��ֻ�&�"=I�&���(A�(�{:����h� ����sS��%yho#{/)�&�NN{�X2�ƹ�C$�U�G�</�_%��jP^r��Bi�%��JQ�}���èx �7�3����]��U�eH;�b�}"GM��OH6��Y��}0��:c�RIȘȩB�Dgq�Cv�	�6jP&��>�z®!W���Ȍ��B�R�Jh)�M"�i�azD��_�>7�D����Z��Ml�F�hP7�*;�dd����El��zEV��t]MIJk�@��j[�w��\���f�7�ڭ��.ߋ�u�w�ݰ�O��Ur����zw8�H�/I��Je�@I���Hd&��4�^Cb:]��ф�љ�_�z2���؊G@���N�����o)c���y٤��yW��*?ķu�[�\��v' �{�����g���;X}����q���{¼�\0Ê��j���D@�L6BE,S��#�l�V�9��yJb����+Ғ��	3��(3��;�KSO�I�JZ�109zٝ-�Z��[1ݏ��~�A�n�z׻�ٮ7?�<?��?���O��j�{C�����q���6N��K<+
SB��;;���2N��g�4G-�/�`�dY&,+��4+q�ã�t�����={�SOA���lu�*5d��2����!��|H�{Qoo��,�o_����"˰��a/�����c�gXH����g�hJ�l\���R#�ҿ������\�z��JE��E�4����S�k%sE�)���,~�������$Գ�d��+�A	��u���u��\�z��S�8T�P����|ƍ��;�mj�4L���tK=b4�t���G��'��=Zz�Q(*_(fH��Br
�j���\�7-E~0��~��m�!�y�����8���{0�Z��{N� �Y:�$�h��T|�}i��݃�>��x���H�Ϫ���7�_�w�t=�����_j��k좕�]R,8���D I�
�������ϯ�[�O(ԜX~L�����_�zM]01��6��媮�g��rΕ[������W!^���c�#рfƋOM�֝W�7m\t��IꛊF���4�A�n6�/�����7�n���������ָ��ݱI�B����eu���@�L�k�R��Idb�5ɜ̬��w�x�4��H�=�uo������� E �            x��|ɒۺ��X���3��w)�oj��oJ�t� $����������.w�U��p		�2��D�"���C�hh�C ���`�RR��穚��Фfa�=<��7�c���&88�^�_;fmT�pԫ�ڤ���wt�?�u�v;88�=��3 ��w���01
��ÕK�*�(OPG�1�8�=����������5��g�۝��������{;���j��A��xH��������}���|�L��:k���̭���w�Y�~���ݢ�R���ҁ4����+��fJ�Xc��c���y�#]n�8�>�0��6@:H>A�L�3�iŷe{���3��X�!�.}�)\.)��.t���Q+�x��.��^*s7�M8?���^��_����������ߌ:f�C�>̃sּ��lR7zU�G��K5�O^�����/�k���j�?��|����3�i�c,L��HS]�AJqW���J��A�H���v�	�R���{����9���>hg�>�Q��o����]X��7Q��/�F����Z&574�x��-<\�ҭ�rRs��i��%/xs>���J��ۮJc*c�MyZry�7LqI\�t\�<� �; h��:6�
3BR���px����ۍ���ߞ���zթ�9^̂��r2����k�8[wĵ=S���\q��� �}R[��z��T��2s_��@,�?�붦vml�&4����4�8�5J)�$1�u���7��(�%�̈0IYB'Pk�:��isQ��ʤ�����"z�%Z��Tv�'�ð�
�/M%��AϑB��� `k,E�5����1?�����;m��ʭ��۲!��l�X�N[U���|���Ng�T�� ��(������viPh�Y���)�o�u��Y��R8���ʅ�����r���]��%�r��eF�ʺ��At) Z�EN���]�3�;5����ݨ@B#4E���9�F��S�@"���%> ?..��?�(^��<2*�ϐ��w�)黊J$\i��u	al�F��]���<���Zn�����5��	\����#��>�{�Z����w��C��q�U�=��}sP�?��u���@{1(�3l?$q!����PFK��~�ԍIu��4g�s~d������|/��x2�]�O`���#����~��ʫ��5�^sT�3ѧ�0���-ܨ�m�4m̨��u�G(ZW
l|�?�����<�y��2a�[pń#"��E@X_$����S�����b>u�������Ӳ\��ti��������?K�2�� �TJR͂�)w��]������Co4^g+�Mi��O�h�m���Ҿ��o�j:������\��n��g�v�;^]V�<���a���R���Ь�5����3�S����⨕�lv]��\w��F͗�r���+s[S1��G�;�p��<�1`�9Hs��]K�8>�@��&J���]�b�-���3����k� Q���%|�l��Q�x�ф�:� ��GYB7�qe�|��q����������e����x$>��C�}�f\�=��Z��|�]��٨\j�L8�M]����æ�+�j�4�Β�r��i��#��ò�y��6
د�҈���>C�Lx�W{� �ɑ�|KE�'�#���@��=�!Ać��o�W��9-��A��Mv�|X��J�?_�o�����-�'Y��U�P�u���i�߹��5uf�`-�a��rI�mMqUUƝ�Ĕo�Qs�j� .�M��IcLc�&|���E!N��P���
�>\;��i��8@�����&�W��Sެ7O�R��5���6<���F��F�C��Ҏ񁅀o�����ߚz�3�-@�尿���a��&=�QH@KmB2�y��"��v�)ҮȻ"��K_h�� h ��#RیHZ	u4�	�|���ъ�7��<�������]�9���� {.��^mB�y�ٶÿ�� ,�%�o�l��
�HJ#��Z�ʮ��'=��\!`g�z��&T6��e8�6ۧ�y�79�������Ǯ�; 1	���~��F�C�g/n��t^�j�^��Fy�F\��4��lAx�8uO�ٶ�+6���r�2a�����xR�ii���m)�r��EMT��Ik_(<,b)M�?�"π�Ԇܱ"R6�����#f��Fj(�� ���{�?'��=�t���׊栟�e0=&��@�kd��n�귭�*xI�]��B(L^�\6���m��[vײ�U�����2܆�%��=� ��˖7zb��2׫l�)Vʢ�ғ�O|��6w������n�]���S83Ow\��_Ɖ	�fp���Ok�_l��pQ���u��%��-��H�=C��'~}��]�(W��RFc�Sj XEN��,�R	42��$�·5{j�����=9O3���}��/���������=�\щv����]B�kAp_VT�L/Y�����'����%�:_����,7%C�^}���A�g3������^�J*��?l��]sB򌑥�4���H�h6ف(��]�A���ž�cu�ŜA�k#��Z<�~���ޘ��������a���=�E��)�r� ��{���w��^]�IX�<�{,��-�&��pz���4�f��n�;dQ���i���*�~�o��i�Q�R+����8��g��4��w��V�2�P�#V�ql�����Ѳ	�a%���l�E�m/��P�mf���g��'���5!���$S=��&6�����R0۽��b�8�͹��%�{�Z�U�R-w�첹�d+>{+��4qXy;�5���ˤk �Y�oí�f+Z!Gx�B$�0N�7���T�� x�l6���u���7����\��|�m���6A��� �F��*�(��q���B��+`DS.b>P���]e�%��z#�9����w�Y�x����XiC�q��ZshW��r0�V���B��j�&�@%S�3t��FQ0�NaR�u;ݓ��<���v�˶ڱ��)�����*noD-���ջ�I��eK�
Y��+_�$4k���x&8�9���	~&(M�}��P�Ĩ5�gaN�Z(GS*g���x��
��/��@�<��\h��l�������=_z�U,�/�퀫�}e���bu=���J�ݕ�5�����)�	z�L7"S��M�-"�'��jA��C�#�Ga�m#��N$�5�W;���5V�������C�ul�d3ml���:���8��\�븪�/U�^��6��CRW��`3��6y�^�G��K��.\�����`{h�����.�t���s�~.��~F�A����g�ӂ�&6�[����.R0�
��g5��<
�G��Q�6��g�8,4bk�����=���.��F�vJj�u;7)��3���t�Z���Zq��2��:X�&G�m���N��N�#��(d�0���������w�4�6@�Q��}���r��Q��Ӟ#}�cJ��(��<�?���Vk��V�.U��E%5��Bjz;�Jk�)��g@⮺���y�2�.6*���K:�E޲#~U�^�Vh׎��c��Q	��Q2gs�;<P���,8�V �i`'�R�'&L>�*��L+���〱�l{�jK���Fa\�o�ի��ίw�ݜ���IS$޺�s�v�B/S�~�4��UG\������ŷ����#�Y���{;��==�5n���H#����r����*�r ���g�Z���+�mi2��F���p��{���\�N�Rf�gn�=;6�+Y���M��z�g�H'.�I��s8�-�'�}4�j��>���2.s���2-_k瘤f�x��@7j<>w@��� A��}Fk�{|��[l͇��{�e��u!*$�-Ő���D�e�7K�1 �f���:/��_�Ft�I�X9�}�'�u�tȥ�<������� ���u��׭�2TI.}�P�؜�3(�����XI�2�qb9��O�bup����E5ĚJ��bQ�(`ŇK�Z2�Q%CF�����7��ˬ�I �	  -����W�i��	��c')2j�[sӫ��)��w��nC�Ϋ�y�p�{�Î$l6�4C�$c"4,�=��"E��e����V��;P��l����}ʦ����$���F�%������d��vu��T�0��.l�[��X'Hc�r͠րJ������gҥ�fMi���է�"�T��Aj�QFbB#�A�]z���J�-�`���t�u�hkA
�4�3R�� ��1����^�hV>5Ҝ�ǻ�Il�N�:ُr����b��Y���V��q�4�]N��y�ܼ�Nxb�}Vl]��[�� �D��Ҕ���(݅w��B�M]�g�"FO�N *e�*e6w�V���y��2�H�\s췷��Vv�Ю����r`��k���]���x���/�nr���a9��G�ko[ъ�Ʊ~�4�âqiC:��
�A�yg�|��f���qg&��G�����/b��N,�{���S N��O �t���;'5@#_�;~�\^�����y����؜n��-_^W�z�曱����\��>���J�w�77$3�R+��I�x������[����BH��`�Ϙ����Z�P���[����Ȇm�s�@��z�8�s�5�ܗ�3�������W��~f�#��e����ްr$���������� 6�Vԗ��!���Ϧ��?=-��زIܼ���Na�o���`y�Q�P���C��;�p�W�AS�B�M	F(�)��v��
�`�g菟�w��!d���y��X��k3]��vx���_��)�����X�'>�8/��a;��j�ѝ�7+�M\�;��Y&��.�6��_���UMQ����Crk��)����K�B{�%!@�b��$
�!����3�M=�/�7���=Q�ZU�f�]��
#r�~;�@k��;�=3-o+��Al���cę��������dw_f)< �΋��e�cGK�:�S*iU$�?�R����X�ו�{�jd��[�A�w��u��X�?�.�p�[�+Li׾��q�k,��kK�)J(�b�s�z�FЀp
����bV��x{׬��_�E]>k��*��g��&��%�Ci����%��r��؎������ޥ�(fs���2�f�x��dT˝��A�M���@z��|ٮ�H���DF�ƷV&�����Sܺ���Q��Ǆ�>�]��g�w�@�:�1ϏD�=Z�mz���C�Z�;�Ѩ�+�s�l�c�7��T�,� �`�������8�V��|�7�Y�}�:��	f�Gсl8'q�@�V�׍nS�x�O��� ���3��<��K%��gD�?p�*:$=��j��
|����A���@�TX殓Q�a�Y�fl��/��W�Ǖua��ϺX=�\���EV� %������Bi��^�A �"J���q��̹֎��r\i\��u>F>C��;у�13�3��n
���lr͵+�N\���J����֫Q����x��28��N�¦��T�aw��_.����@�	i�����r�crn=�J`4���E�aI�]�!���36s�A #��3��@�<��#��ć&�?L�rf{,k~ 󹠭�N^�\���Ep���/A@&��^�8\���ׂ����rqh,vI�m�ιT��B$;�Å���D�G�����1���.$S��而��C|����}\\M�r]�3�û&���n��փIk�ϴl�n����&��{Y��,2o�-�竗*?�K,5ġ#�sU��y�LkfQ���~�y�p.f"�M���dw�ie�: �N^��s�4z�AZ���`�Ғ+M,<��6S���&W�bN��<0�R�y���U�t/���FK�Ȁ֙U<���[��%<Ϗ�4����:q����Uy���$�������z�6�Mͺc�<�G�??����ŵ���it��$'�c�J!+(�2�*GE/)�e�bl��)�.��*Ɵ�!�F�pl���DcZ>�W2���5����/���p��ҼM�dU�����j�X_N����֙b�]ƽy�u9x��:�-6`����O��0zue�~�$��������\����(1@;R��Օcc �F�a�%.����� ��ִ��v�-��c{���ת��B6g庙��:}4�Sk���>�u��� ����
�H�eWA�Ţ>��Y7���w9<R�5G�_��^�������h�j��?�����Q�ƹ\�*��B��PB�G��Z㪁w���ʄ��g �)�cP��'=u5r��m�g<u7���<5��Y�4��ãZ��O�P�W�Ф��>�V��ۜq�Ao�?Z�N������.k?��~R�]�Z.�y'dlH��ұ��GT���qt+b�����y�@�Z�����s�ԓ۰?0��O��)N:Ӣ,��b��$�^È�M��䇢��K,zY�k������,���^� �������p��Nխ	���Ym����?E|,,:�m������P1��g��s��+�_:������K������^�Ѳ��.���|���=�            x������ � �         �  x�ŕ�nAE�=_�=����U=;$�,�%�~TǶ�A��)'�� �F���V����=�t.=r�Gk�)��|l�E)�'gW�~{*����}�s}}=˗ry��������F��Ԥ���"�6?Лo�׳�2P�X\B\��)����&2�2��tAq�956	�9c��8"#�V!�m�}@!����c�%~��j{C�PXl����8OI�39Wn`�|�ZS�\�:�,!�����W&�.j.z�
ޞ�֘�Ft6��A�捬c��b���վ����%���4KS0V,W�Ijq�FXۻE��y��v�|w�|vc��AwT�E8�)D��w.���������)�Zk"4U|���;C��:z�X��iM����w'P<�L��O؃�P����b�Co��w6)l�]0,5��G��Ҕ���a�*�"��衄Tj��	w�V��כ�p2�z<-/_^ݿ�����@\V����xv�c�,�=k�k�;�s�qV�@���e�UML�W�,�!x�V렀ռ��n��b���y_��L��@��Bn�?��OIS6Q2����cJϩpI?%U���̻�\���l�J?]����=��+)�s9��U�nc��)7k����4M_z{�            x������ � �            x������ � �     